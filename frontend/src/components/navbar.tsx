import React from 'react'
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ManoAloeGif from '../assets/miscellaneous/AloeiconsBIG.gif'
import LanguageSwitchButton from './languageSwitch/languageSwitch';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#29222f',
        boxShadow: '0px 5px 50px 0px rgba(0, 0, 0, 0.2)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    const button = {
        width: 64,
        height: 64,
        padding: 0,
        color: '#ffffff'
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{marginLeft: "5vw", marginRight: "5vw"}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img src={ManoAloeGif} alt="Mano Aloe GIF" style={{maxWidth: "50px", maxHeight: "50px"}}/>
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        魔の友 (Manotomo)
                    </Typography>

                    {[
                        {externalLink: false, link: '/', altText: "Home", iconFunc: () => <HomeIcon/>},
                        {externalLink: false, link: '/game', altText: "Games", iconFunc: () => <SportsEsportsIcon/>},
                        {externalLink: false, link: '/art', altText: "Artwork", iconFunc: () => <MapIcon/>},
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
                                    key={idx} style={button} aria-label={buttonAltText}
                                >
                                    {obj.iconFunc()}
                                </IconButton>
                            );
                        } else {
                            return (
                                <Link to={obj.link}>
                                    <IconButton key={idx} style={button} aria-label={buttonAltText}>
                                        {obj.iconFunc()}
                                    </IconButton>
                                </Link>
                            );
                        }
                    })}
                    <LanguageSwitchButton/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
