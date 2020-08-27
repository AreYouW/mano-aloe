import React from "react";
import {Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ScrollDownIcon from './assets/arrow-down.png';

import Navbar from './components/navbar'
import HomePage from './pages/home/home'
import GamePage from './pages/game/game'
import ArtPage from './pages/gallery/art'
import './App.css';

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

class App extends React.Component<RouteComponentProps, LanguageContextValue> {

    constructor(props: RouteComponentProps) {
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
    
    // componentDidUpdate(prevProps: AppProps) {
    //     if (this.props.location !== prevProps.location) {

    //     }
    // }

    render() {
        console.log(window.location.pathname);
        return (
            <LanguageContext.Provider value={this.state}>
                <main className="main">
                    <div>
                        <header className="App-header">
                            <div className="community-message-card">
                                <h1 className="community-message-header">A Community Message for Aloe</h1>
                                <div className="community-message-body">
                                    <p>
                                        Dear Aloe, in celebration of your return, we've organized a community full of
                                        amazing fans to show our support! On behalf of everybody from the M.A.S.S.
                                        community, welcome back!
                                    </p>
                                </div>
                            </div>
                            {this.props.location.pathname === "/" &&
                            <AnchorLink offset='100' href='#home'>
                                <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button"/>
                            </AnchorLink>
                            }
                        </header>
                    </div>
                    <Navbar/>
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

export default withRouter(App);
