import React, { Component, useState, useEffect } from 'react'

import './timer.css';

interface Countdown 
{
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
}

class Timer extends Component 
{

    timerid: any;
    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        update: () => this.calcTime()
    };

    constructor(props: any) 
    {
        super(props);
    }

    componentDidMount(): void 
    {
        this.timerid = setInterval(() => {
            this.calcTime();
            this.setState(this.state);
        }, 1000);
    }

    componentDidUnmount(): void 
    {
        clearInterval(this.timerid);
    }

    calcTime(): Countdown 
    {
        const diff = +new Date(`10/18/2020`) - +new Date();
        if (diff > 0)
        {
            this.state.days     =   Math.floor( diff / (1000 * 60 * 60 * 24));
            this.state.hours    =   Math.floor((diff / (1000 * 60 * 60)) % 24);
            this.state.minutes  =   Math.floor((diff / 1000 / 60) % 60);
            this.state.seconds  =   Math.floor((diff / 1000) % 60);
        }
        return this.state;
    }

    render()
    {
        return (
            <div>
                <button onClick={() => this.setState(this.state)}>test</button>
                {this.state.days} DAYS, {this.state.hours} HOURS, {this.state.minutes} MINUTES AND {this.state.seconds} SECONDS
            </div>
        );
    }
}

export default Timer;
