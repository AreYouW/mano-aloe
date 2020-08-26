import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import AloeHeartIcon from './assets/AloeHeartIcon.png'

import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import GamePage from './pages/Game'
import ArtPage from './pages/Art'
import './App.css';

import SessionService from "./services/session.service";
import { LanguageContext, LanguageContextValue } from "./components/languageSwitchSection/languageContext";
import DisplayedLanguage from "./models/language";

interface AppProps { }

export default class App extends React.Component<AppProps, LanguageContextValue> {

  constructor(props: AppProps) {
    super(props);
  }

  state: LanguageContextValue = {
    language: DisplayedLanguage.Original,
    toggleLanguage: () => {
      const { language } = this.state;
      const nextLanguage = language === DisplayedLanguage.Original ? DisplayedLanguage.Japanese : DisplayedLanguage.Original;
      
      this.setState({language: nextLanguage});
      SessionService.saveLanguage(nextLanguage);
    }
  };

  componentDidMount() {
    if (SessionService.getLanguage() === null) {
      SessionService.saveLanguage(DisplayedLanguage.Original);
    }
    this.setState({language: SessionService.getLanguage() as DisplayedLanguage});
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state}>
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
      </LanguageContext.Provider>
    );
  }
}
