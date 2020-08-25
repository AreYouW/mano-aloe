import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AloeHeartIcon from './assets/AloeHeartIcon.png'

import Grid from '@material-ui/core/Grid'

import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import GamePage from './pages/Game'
import ArtPage from './pages/Art'
import './App.css';

export default function App() {
  return (
    <main>
      <div style={{backgroundColor: "#29222f"}}>
        <header className="App-header">
          <Grid container justify="center" spacing={0}>
            <Grid item xs={10} style={{textAlign:"center" }}>
              <iframe title="Mano Aloe Fanmade Video" className="video-tag-left" src="https://www.youtube.com/embed/4ZvmV2JNOoA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </Grid>
            <Grid item xs={2}>
              <img className="logo-tag-right App-logo" src={AloeHeartIcon} alt="logo" />
            </Grid>
          </Grid>
        </header>
        <Navbar />
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/game' component={GamePage} />
          <Route path='/art' component={ArtPage} />
        </Switch>
      </div>
    </main>
  );
}
