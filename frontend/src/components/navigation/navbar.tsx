import React from 'react'
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Logo from '../../assets/icons/AloeHeartIcon.png'
import LanguageSwitchButton from '../languageSwitch/languageSwitch';

import './navbar.css';

export default function ButtonAppBar() {
    return (
        <header className="navbar">
            <img className="icon-button" src={Logo} alt="aloe heart logo"/>
            <div className="title">魔の友から、アロエちゃんへ</div>
            <div className="icons">
                {[
                    {
                        externalLink: false,
                        link: '/home',
                        altText: "Home",
                        iconFunc: () => <HomeIcon/>
                    },
                    {
                        externalLink: false,
                        link: '/game',
                        altText: "Games",
                        iconFunc: () => <SportsEsportsIcon/>
                    },
                    {
                        externalLink: false,
                        link: '/art',
                        altText: "Artwork",
                        iconFunc: () => <PhotoLibraryIcon/>
                    },
                    {
                        externalLink: true,
                        link: 'https://github.com/AreYouW/mano-aloe',
                        altText: "github",
                        iconFunc: () => <InfoIcon/>
                    },
                ].map((obj, idx) => {
                    // For accessibility purposes
                    let buttonAltText = (obj.altText ?? "");
                    if (obj.externalLink) {
                        return (
                            <IconButton target="_blank" rel="noopener noreferrer" href={obj.link}
                                key={idx} className="button inactive-page-icon" aria-label={buttonAltText}
                            >
                                {obj.iconFunc()}
                            </IconButton>
                        );
                    } else {
                        return (
                            <NavLink key={idx} to={obj.link} className='inactive-page-icon' activeClassName='active-page-icon'>
                                <IconButton key={idx} className="button" aria-label={buttonAltText}>
                                    {obj.iconFunc()}
                                </IconButton>
                            </NavLink>
                        );
                    }
                })}
                <LanguageSwitchButton/>
            </div>
        </header>
    );
}
