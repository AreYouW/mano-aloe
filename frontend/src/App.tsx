import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import Navbar from './components/Navbar'
import AloeHeartIcon from './assets/AloeHeartIcon.png'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import LatestNewsPage from './pages/LatestAloeMano'
import MapPage from './pages/Map'
import './App.css';

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
            <MapPage />
          </Route>
          <Route path="/latest">
            <LatestNewsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}