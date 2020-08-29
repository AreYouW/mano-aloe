import React from "react";
import {Route, Switch} from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ScrollDownIcon from './assets/miscellaneous/arrow-down.png';

import Navbar from './components/navbar'
import HomePage from './pages/home/home'
import GamePage from './pages/game/game'
import ArtPage from './pages/gallery/art'
import './App.css';

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

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
                                        Dear Aloe, in celebration of your return,
                                        we've organized a site full of messages that your fans have sent you!
                                        On behalf of every Manotomo out there, welcome back!
                                    </p>
                                    <p>アロエさん、カムバックのお祝いに。
                                        ファンからのメッセージを集めたサイトを作りました。
                                        魔の友の代表として、おかえりなさい！</p>
                                </div>
                            </div>
                            <AnchorLink offset='100' href='#anchor'>
                                <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button"/>
                            </AnchorLink>
                        </header>
                    </div>
                    <Switch>
                        <Route path='/' component={HomePage} exact/>
                        <Route path='/game' component={GamePage}/>
                        <Route path='/art' component={ArtPage}/>
                    </Switch>
                </main>
            </LanguageContext.Provider>
        );
    }
}
