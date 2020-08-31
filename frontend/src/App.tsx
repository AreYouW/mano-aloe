import React, { Suspense, lazy } from "react";
import {Route, Switch} from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ScrollDownIcon from './assets/miscellaneous/arrow-down.png';

import Navbar from './components/navbar';
import './App.css';

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

const HomePage = lazy(() => import('./pages/home/home'));
const GamePage = lazy(() => import('./pages/game/game'));
const ArtPage = lazy(() => import('./pages/gallery/art'));

interface AppProps {
}

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
                <main className="main">
                    <Navbar/>
                    <div>
                        <header className="App-header">
                            <div className="community-message-card">
                                <h1 className="community-message-header">A Community Message for Aloe</h1>
                                <div className="community-message-body">
                                    <p>
                                        Dear Aloe, thank you for everything. While it may have been but for a short while, we appreciate every little thing you've given us. We wish you the best of luck going forward.
                                    </p>
                                    <p>
                                        親愛なるアロエ様、いろいろありがとうございます。短い間ではありましたが、一つ一つのことに感謝しています。今後のご活躍をお祈りしております。
                                    </p>
                                </div>
                            </div>
                            <AnchorLink offset='100' href='#anchor'>
                                <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button"/>
                            </AnchorLink>
                        </header>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path='/' component={HomePage} exact/>
                            <Route path='/game' component={GamePage}/>
                            <Route path='/art' component={ArtPage}/>
                        </Switch>
                    </Suspense>
                </main>
            </LanguageContext.Provider>
        );
    }
}
