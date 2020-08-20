import React from "react";
import Navbar from './components/Navbar'
import AloeHeartIcon from './assets/AloeHeartIcon.png'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  Switch
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <header className="App-header">
          <img src={AloeHeartIcon} className="App-logo" alt="logo" />
        </header>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/map">
            <About />
          </Route>
          <Route path="/latest">
            <About />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Map() {
  return <h2>MAP</h2>;
}

function Latest() {
  return <h2>LATEST</h2>
}