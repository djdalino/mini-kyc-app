import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SwitchPage from "./components/Pages/SwtichPages";
import ViewPage from "./components/Pages/ViewPage";
function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />

        <Switch>
          <Route exact path="/" component={SwitchPage} />
          <Route path="/view" component={ViewPage} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
