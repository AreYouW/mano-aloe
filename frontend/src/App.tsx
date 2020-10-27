import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import ButtonAppBar from './components/navigation/navbar';
import InPageNav from './components/inPageNav/inPageNav';
import './App.css';

import Timer from './components/timer/timer'

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

const HomePage = lazy(() => import('./pages/home/home'));
const GamePage = lazy(() => import('./pages/game/game'));
const ArtPage = lazy(() => import('./pages/gallery/art'));

interface AppProps {
}

const AltNav = () => {
    const location = useLocation();
    if (location.pathname == "/home") {
        return <InPageNav />;
    }
    return <span />
};

export default class App extends React.Component<AppProps, LanguageContextValue> {

    constructor(props: AppProps) {
        super(props);
    }

    state: LanguageContextValue = {
        language: DisplayedLanguage.Original,
        toggleLanguage: () => {
            const {language} = this.state;
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
                <ButtonAppBar />
                <div>
                    <header className="App-header">
                        <div style={{height: 50}}/>
                        <div className="community-message-card">
                            <h1 className="community-message-header">A Community Message for Aloe</h1>
                            <div className="community-message-body">
                                <p>Dear Aloe, thank you for everything. While it may have been but for a short while, we appreciate every little thing you've given us. We wish you the best of luck going forward.</p>
                                <p>親愛なるアロエ様。短い間ではありましたが、一緒に過ごした時間に心より感謝しております。本当にありがとうございました。アロエ様のご健勝とご多幸をお祈り申し上げます。</p>
                            </div>
                        </div>
                        <div style={{height: 50}}/>
                        <AltNav />
                        <div style={{height: 50}}/>
                    </header>
                </div>
                <main className="main">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/'>
                                <Redirect to="/home" />
                            </Route>
                            <Route path='/home' component={HomePage}/>
                            <Route path='/game' component={GamePage}/>
                            <Route path='/art' component={ArtPage}/>
                        </Switch>
                    </Suspense>
                </main>
            </LanguageContext.Provider>
        );
    }
}
