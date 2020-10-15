import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import React from 'react'

import './inPageNav.css'
import '../../shared/globalStyles/global.css'


const useStyles = makeStyles((theme) => ({
  root: {
    color: "#333031",
    backgroundColor: "#333031",
    '&:hover': {
      backgroundColor: "#333039",
    },
  },
}));


export default function InPageNav() {
    const classes = useStyles();

    return (
        <div className="in-page-nav">
            <Button variant="contained" startIcon={<SportsEsportsIcon />} size="large" color="primary" className={classes.root}>
                <NavLink to={"/game"}>Games</NavLink>
            </Button>
            <Button variant="contained" startIcon={<PhotoLibraryIcon />} size="large" color="primary">
                <NavLink to={"/art"}>Gallery</NavLink>
            </Button>
        </div>
    );
}
