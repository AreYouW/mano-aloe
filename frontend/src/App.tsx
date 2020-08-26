import React from "react";
import AloeHeartIcon from './assets/AloeHeartIcon.png';
import ScrollDownIcon from './assets/arrow-down.png';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import Grid from '@material-ui/core/Grid'

import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import './App.css';

export default function App() {
  return (
    <div className="App-root">
      <header className="App-header">
				<iframe title="Mano Aloe Fanmade Video" className="video-tag-left" src="https://www.youtube.com/embed/4ZvmV2JNOoA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
				<img className="logo-tag-right App-logo" src={AloeHeartIcon} alt="logo" />
        <AnchorLink offset='100' href='#home'>
          <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button" />
        </AnchorLink>
      </header>
      <Navbar />
      <section id='home'>
        <HomePage />
      </section>
    </div>
  );
}
