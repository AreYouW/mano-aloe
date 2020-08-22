import React from "react";
import AloeBackground from './assets/bg.png'
import AloeHeartIcon from './assets/AloeHeartIcon.png'

import Grid from '@material-ui/core/Grid'

import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import './App.css';

export default function App() {
  return (
    <div style={{backgroundColor: "#29222f"}}>
      <header className="App-header">
        <img className="background-img" src={AloeBackground} alt="Aloe Background" />
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
      <HomePage />
    </div>
  );
}