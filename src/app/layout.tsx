import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartUML",
  description: "SmartUML is an AI-powered UML diagram generator that transforms your plain text prompts into clean, professional UML diagrams in seconds. Built with Next.js and powered by the PlantUML engine, SmartUML supports a wide range of diagram types including class diagrams, sequence diagrams, use case diagrams, activity diagrams, state charts, and more. Whether you\'re a software engineer, system architect, student, or project manager, SmartUML makes it easy to visualize system designs, document workflows, and communicate complex architectures with clarity. Simply enter your description, and SmartUML will generate high-quality diagrams that you can view, edit, or download instantly. Say goodbye to manual diagramming. Start creating smarter, faster, and better with SmartUML — your intelligent UML diagram assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8651394050112418"
        crossorigin="anonymous"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
