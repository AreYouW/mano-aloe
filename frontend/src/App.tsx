import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import Grid from '@material-ui/core/Grid'
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
          <img className="background-img" src={AloeBackground} alt="Aloe Background" />
          <Grid container justify="center" spacing={0}>
            <Grid item xs={10} style={{textAlign:"center" }}>
              <iframe style={{verticalAlign: "baseline"}} className="video-tag-left" src="https://www.youtube.com/embed/4ZvmV2JNOoA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Grid>
            <Grid item xs={2}>
              <img className="logo-tag-right App-logo" src={AloeHeartIcon} alt="logo" />
            </Grid>
          </Grid>
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