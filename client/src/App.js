import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

import SwitchPage from "./components/Common/SwitchPage";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero data="Secure your account in 3 simple step" />

      <SwitchPage />
    </React.Fragment>
  );
}

export default App;
