import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AloeHeartIcon from './assets/AloeHeartIcon.png'

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
					<div className="community-message-card">
					<h1 className="community-message-header">A Community Message for Aloe</h1>
					<div className="community-message-body">
						<p>
							Dear Aloe, in celebration of your return, we've organized a community full of amazing fans to show our support! On behalf of everybody from the M.A.S.S. community, welcome back!
						</p>
					</div>
				</div>

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
