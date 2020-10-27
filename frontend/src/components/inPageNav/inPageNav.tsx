import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import React from 'react'

import './inPageNav.css'
import '../../shared/globalStyles/global.css'


const useStyles = makeStyles((theme) => ({
  containedPrimary: {
    color: "#ffffff",
    backgroundColor: "#724683",
    '&:hover': {
      backgroundColor: "#fd418d",
    },
  },
}));


export default function InPageNav() {
    const classes = useStyles();

    return (
        <div className="in-page-nav">
            <NavLink to={"/game"}>
                <Button variant="contained" startIcon={<SportsEsportsIcon />} size="large" color="primary" className={classes.containedPrimary}>
                    Games
                </Button>
            </NavLink>
            <NavLink to={"/art"}>
                <Button variant="contained" startIcon={<PhotoLibraryIcon />} size="large" color="primary" className={classes.containedPrimary}>
                    Gallery
                </Button>
            </NavLink>
        </div>
    );
}
