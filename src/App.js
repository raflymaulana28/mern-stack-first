import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import BalanceList from "./components/balance-list.component";
import EditBalance from "./components/edit-balance.component";
import CreateBalance from "./components/create-balance.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={BalanceList} />
        <Route path="/edit/:id" exact component={EditBalance} />
        <Route path="/create" exact component={CreateBalance} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
