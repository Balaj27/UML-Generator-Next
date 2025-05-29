import Script from "next/script";
import React from "react";


function AdSense(){

    return(
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8651394050112418"
            crossOrigin="anonymous"
        />
    );
}

export default AdSense;