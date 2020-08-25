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
      <div className="App-root">
        <header className="App-header">
          <iframe title="Mano Aloe Fanmade Video" className="video-tag-left" src="https://www.youtube.com/embed/4ZvmV2JNOoA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
          <img className="logo-tag-right App-logo" src={AloeHeartIcon} alt="logo" />
        </header>
      </div>
        <Navbar />
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/game' component={GamePage} />
          <Route path='/art' component={ArtPage} />
        </Switch>
    </main>
  );
}
