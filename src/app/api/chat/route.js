import { GoogleGenerativeAI } from "@google/generative-ai";
import plantumlEncoder from "plantuml-encoder";
import { NextResponse } from "next/server";

// It's recommended to use your API key via an environment variable for security.
// In a .env.local file at your project root, add: GeminiApi=YOUR_GEMINI_API_KEY
const apiKey = process.env.GeminiApi || "AIzaSyCmaEMHXr0febZMxLLqco8kQRPv6bg7KDw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const MAX_RETRIES = 5;
const PLANTUML_SERVER = "http://www.plantuml.com/plantuml/png/";

let previousUMLCode = "";

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, editMessage } = body;

    // Simple validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    let retryCount = 0;
    let success = false;
    let plantUMLCode = "";
    let imageUrl = "";

    const syntaxExamples = `
      Usecase diagram Syntax:
      @startuml
      left to right direction
      actor "Food Critic" as fc
      rectangle Restaurant {
        usecase "Eat Food" as UC1
        usecase "Pay for Food" as UC2
        usecase "Drink" as UC3
      }
      fc --> UC1
      fc --> UC2
      fc --> UC3
      @enduml,

      Class diagram Syntax:
      @startuml
      abstract        abstract
      abstract class  "abstract class"
      annotation      annotation
      circle          circle
      ()              circle_short_form
      class           class
      class           class_stereo  <<stereotype>>
      diamond         diamond
      <>              diamond_short_form
      entity          entity
      enum            enum
      exception       exception
      interface       interface
      metaclass       metaclass
      protocol        protocol
      stereotype      stereotype
      struct          struct
      @enduml,

      Activity Syntax:
      @startuml
      start
      :Hello world;
      :This is defined on
      several **lines**;
      stop
      @enduml,

      Sequence Syntax:
      @startuml
      participant Participant as Foo
      actor       Actor       as Foo1
      boundary    Boundary    as Foo2
      control     Control     as Foo3
      entity      Entity      as Foo4
      database    Database    as Foo5
      collections Collections as Foo6
      queue       Queue       as Foo7
      Foo -> Foo1 : To actor
      Foo -> Foo2 : To boundary
      Foo -> Foo3 : To control
      Foo -> Foo4 : To entity
      Foo -> Foo5 : To database
      Foo -> Foo6 : To collections
      Foo -> Foo7: To queue
      @enduml,

      Component Diagram:
      @startuml
      package "Some Group" {
        HTTP - [First Component]
        [Another Component]
      }
      node "Other Groups" {
        FTP - [Second Component]
        [First Component] --> FTP
      }
      cloud {
        [Example 1]
      }
      database "MySql" {
        folder "This is my folder" {
          [Folder 3]
        }
        frame "Foo" {
          [Frame 4]
        }
      }
      [Another Component] --> [Example 1]
      [Example 1] --> [Folder 3]
      [Folder 3] --> [Frame 4]
      @enduml

      state diagram:
      @startuml
      [*] -> State1
      State1 --> State2 : Succeeded
      State1 --> [*] : Aborted
      State2 --> State3 : Succeeded
      State2 --> [*] : Aborted
      state State3 {
        state "Accumulate Enough Data" as long1
        long1 : Just a test
        [*] --> long1
        long1 --> long1 : New Data
        long1 --> ProcessData : Enough Data
        State2 --> [H]: Resume
      }
      State3 --> State2 : Pause
      State2 --> State3[H*]: DeepResume
      State3 --> State3 : Failed
      State3 --> [*] : Succeeded / Save Result
      State3 --> [*] : Aborted
      @enduml

      Object Diagram:
      @startuml
      left to right direction
      ' Horizontal lines: -->, <--, <-->
      ' Vertical lines: ->, <-, <->
      title PERT: Project Name

      map Kick.Off {
      }
      map task.1 {
          Start => End
      }
      map task.2 {
          Start => End
      }
      map task.3 {
          Start => End
      }
      map task.4 {
          Start => End
      }
      map task.5 {
          Start => End
      }
      Kick.Off --> task.1 : Label 1
      Kick.Off --> task.2 : Label 2
      Kick.Off --> task.3 : Label 3
      task.1 --> task.4
      task.2 --> task.4
      task.3 --> task.4
      task.4 --> task.5 : Label 4
      @enduml

      deployment diagram:
      @startuml
      <style>
      componentDiagram {
        BackGroundColor palegreen
        LineThickness 2
        LineColor red
      }
      </style>
      artifact artifact {
      }
      card card {
      }
      cloud cloud {
      }
      component component {
      }
      database database {
      }
      file file {
      }
      folder folder {
      }
      frame frame {
      }
      hexagon hexagon {
      }
      node node {
      }
      package package {
      }
      queue queue {
      }
      rectangle rectangle {
      }
      stack stack {
      }
      storage storage {
      }
      @enduml

      network diagram:
      @startuml
      nwdiag {
        network NETWORK_BASE {
        width = full
        dev_A [address = "dev_A" ]
        dev_B [address = "dev_B" ]
        }
        network IntNET1 {
        width = full
        dev_B [address = "dev_B1" ]
        dev_M [address = "dev_M1" ]
        }
        network IntNET2 {
        width = full
        dev_B [address = "dev_B2" ]
        dev_M [address = "dev_M2" ]
      }
      }
      @enduml
    `;

    while (retryCount < MAX_RETRIES && !success) {
      try {
        const chatSession = model.startChat({
          generationConfig,
          history: [],
        });

        let refinedPrompt = `
          Only generate valid PlantUML code.
          Do not include comments.
          Start with @startuml and end with @enduml.
          Ensure no syntax errors.
          If there are errors, regenerate the code.

          Scenario: ${message}
          ${editMessage ? `Edit Request: ${editMessage}\n` : ""}
          Existing Code: ${previousUMLCode || ""}
          ${syntaxExamples}
        `;

        const result = await chatSession.sendMessage(refinedPrompt);
        plantUMLCode = result.response.text().trim();

        if (
          plantUMLCode &&
          plantUMLCode.startsWith("@startuml") &&
          plantUMLCode.endsWith("@enduml")
        ) {
          const encoded = plantumlEncoder.encode(plantUMLCode);
          imageUrl = `${PLANTUML_SERVER}${encoded}`;
          success = true;
          previousUMLCode = plantUMLCode;
        } else {
          throw new Error("Invalid PlantUML code");
        }
      } catch {
        // No need to capture the 'err' variable since it's not used
        retryCount++;
      }
    }

    if (success) {
      return NextResponse.json({ url: imageUrl });
    } else {
      return new NextResponse(
        "Failed to generate a valid diagram after multiple attempts.",
        { status: 500 }
      );
    }
  } catch (error) {
    // Print the real error in the server logs for debugging
    console.error("API Route Error:", error);
    return new NextResponse("Error generating response: " + error.message, { status: 500 });
  }
}