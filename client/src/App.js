import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SwitchPage from "./components/Pages/SwtichPages";
import UserList from "./components/Pages/UserList";
import ViewPage from "./components/Pages/ViewPage";
function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />

        <Switch>
          <Route exact path="/" component={SwitchPage} />

          <Route path="/view/:id" component={ViewPage} />
          <Route exact path="/view" component={UserList} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
