import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import AloeHeartIcon from './assets/AloeHeartIcon.png'
import ScrollDownIcon from './assets/arrow-down.png';

import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import GamePage from './pages/Game'
import ArtPage from './pages/Art'
import './App.css';

export default function App() {
  return (
    <main className="main">
      <div>
        <header className="App-header">
					<div className="title-wrapper">
						<div className="title">
							Mano Aloe Support Squad [M.A.S.S.]
						</div>
					</div>
          <AnchorLink offset='100' href='#home'>
            <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button" />
          </AnchorLink>
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
