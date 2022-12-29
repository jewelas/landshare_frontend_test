import React from "react";
import "./App.css";
import "./components/common/common.css";
import { Background } from "./components/hoc/Background";
import LandshareFunctionsProvider from "./contexts/LandshareFunctionsProvider";
import Home from "./views/Home";

function App() {
  return (
    <LandshareFunctionsProvider>
      <Background>
        {/* BACKGROUND IS HOC FOR JUST MAINTAIN THE APP BACKGROUND AND FOOTER */}
        <Home />
      </Background>
    </LandshareFunctionsProvider>
  );
}

export default App;
