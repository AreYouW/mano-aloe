import React, { Component, useState, useEffect } from 'react'

import './timer.css';

interface AppProps {
}

interface Countdown {
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
}

class Timer extends Component {

    constructor(props: AppProps) {
        super(props);
    }

    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        update: () => this.calcTime()
    };
    
    calcTime(): Countdown {
        const diff = +new Date(`10/18/2020`) - +new Date();
        if (diff > 0)
        {
            this.state.days=       Math.floor( diff / (1000 * 60 * 60 * 24));
            this.state.hours=      Math.floor((diff / (1000 * 60 * 60)) % 24);
            this.state.minutes=    Math.floor((diff / 1000 / 60) % 60);
            this.state.seconds=    Math.floor((diff / 1000) % 60);
        }
        return this.state;
    }

    //setState({calcTime()});

    render()
    {
        let t = this.calcTime();
        console.log(t);
        return (
            <div>
                {t.days} DAYS, {t.hours} HOURS, {t.minutes} MINUTES AND {t.seconds} SECONDS
            </div>
        );
    }
}

export default Timer;
