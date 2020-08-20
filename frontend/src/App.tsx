import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import Navbar from './components/Navbar'
import AloeBackground from './assets/bg.png'
import AloeHeartIcon from './assets/AloeHeartIcon.png'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import GamePage from './pages/Game'
// import LatestNewsPage from './pages/LatestAloeMano'
import MapPage from './pages/Map'
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <header className="App-header">
          <img src={AloeBackground} alt="Aloe Background" style={{maxWidth:"80vw"}}/>
          <iframe className="video-tag-left" src="https://www.youtube.com/embed/mM1fiRGR7bw" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <img src={AloeHeartIcon} alt="logo" className="logo-tag-right App-logo" />
        </header>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/game">
            <GamePage />
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