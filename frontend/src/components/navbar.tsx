import React from 'react'
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ManoAloeGif from '../assets/miscellaneous/Aloeicon.gif'
import LanguageSwitchButton from './languageSwitch/languageSwitch';

import './navbar.css';

export default function ButtonAppBar() {
    return (
        <header className="navbar">
            <img className="icon-button" src={ManoAloeGif} alt="Mano Aloe GIF"/>
            <div className="title">魔の友から、アロエへ</div>
            <div className="icons">
                {[
                    {externalLink: false, link: '/', altText: "Home", iconFunc: () => <HomeIcon/>},
                    {externalLink: false, link: '/game', altText: "Games", iconFunc: () => <SportsEsportsIcon/>},
                    {externalLink: false, link: '/art', altText: "Artwork", iconFunc: () => <PhotoLibraryIcon/>},
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
                                key={idx} className="button" aria-label={buttonAltText}
                            >
                                {obj.iconFunc()}
                            </IconButton>
                        );
                    } else {
                        return (
                            <Link to={obj.link}>
                                <IconButton key={idx} className="button" aria-label={buttonAltText}>
                                    {obj.iconFunc()}
                                </IconButton>
                            </Link>
                        );
                    }
                })}
                <LanguageSwitchButton/>
            </div>
        </header>
    );
}
