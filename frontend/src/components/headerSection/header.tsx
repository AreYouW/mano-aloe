import React, { Component } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import {Cancel} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import Manotomo1 from '../../assets/sprites/manotomo1.png'
import Manotomo2 from '../../assets/sprites/manotomo2.png'

import './header.css'

interface HeaderState
{
}

interface HeaderProps
{
}

const AltNav = () => {
    const location = useLocation();
    if (location.pathname == "/home") {
        return <InPageNav />;
    }
    return <span />
};

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps)
    {
        super(props);
    }

    renderDefaultSection(): JSX.Element
    {
        return (
            <>
                <header className="App-header">
                    <div style={{height: 170}}/>
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
                <div className="separator">
                    <AnchorLink offset='120' href='#video-anchor'>
                        <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                    </AnchorLink>
                </div>
            </>
       )
    }

    renderBirthdayHeader(): JSX.Element
    {
        return (
            <>
                <header className="App-header App-Birthday-header">
                    <div style={{height: 50}}/>
                    <img id="manotomo1" src={Manotomo1}/>
                    <img id="manotomo2" src={Manotomo2}/>
                </header>
                <div className="separator">
                    <AnchorLink offset='120' href='#bday-card'>
                        <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                    </AnchorLink>
                </div>
                <div id="bday-card" className="justify-align-center bday-msg-container">
                    <div className="community-message-card birthday-card">
                        <h1 className="community-message-header">Happy Birthday, Aloe</h1>
                        <div className="community-message-body text-center">
                            <p>お誕生日おめでとうございます</p>
                            <p>お元気でいらっしゃいますか</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        let today: Date = new Date();
        if (today.getDate() == 28 && today.getMonth() == 9) //Oct 28th
            return this.renderBirthdayHeader();
        return this.renderDefaultSection();
    }
}
