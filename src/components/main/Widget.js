import { useState } from "react";

export default function Widget(show) {

        const [widgetScript, setWidgetScript ] = useState(false)


        if (!widgetScript) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
            head.appendChild(script);
            setWidgetScript(true)
        }
 
     

        
        if (show === false) {
            return (
                <div
                className="livecoinwatch-widget-6 livecoinwatch-widget-6-hidden my-3 mx-auto justify-content-center"
                lcw-coin="_LAND"
                lcw-base="USD"
                lcw-period="d"
                lcw-color-tx="#000000"
                lcw-color-bg="#ffffff00"
                lcw-border-w="0"
               
              ></div> 
            )
        }
        else {
            return (
                <div
                className="livecoinwatch-widget-6 my-3 mx-auto justify-content-center"
                lcw-coin="_LAND"
                lcw-base="USD"
                lcw-period="d"
                lcw-color-tx="#000000"
                lcw-color-bg="#ffffff00"
                lcw-border-w="0"
               
              ></div> 
            )
        }


}