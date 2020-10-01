import React, { Component } from 'react'

import './timer.css';

interface TimerState 
{
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
}

interface TimerProps {
    date: string;
}

class Timer extends Component<TimerProps, TimerState>
{

    timerid: any;
    state: TimerState= {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    constructor(props: TimerProps) 
    {
        super(props);
    }

    componentDidMount(): void 
    {
        this.timerid = setInterval(() => {
            this.updateTime();
            this.setState(this.state);
        }, 1000);
    }

    componentDidUnmount(): void 
    {
        clearInterval(this.timerid);
    }

    updateTime(): void
    {
        console.log(this.props);
        const diff = +new Date(this.props.date) - +new Date();
        if (diff > 0)
        {
            this.state.days     =   Math.floor( diff / (1000 * 60 * 60 * 24));
            this.state.hours    =   Math.floor((diff / (1000 * 60 * 60)) % 24);
            this.state.minutes  =   Math.floor((diff / 1000 / 60) % 60);
            this.state.seconds  =   Math.floor((diff / 1000) % 60);
        }
    }

    render()
    {
        return (
            <div>
                {this.state.days} DAYS, {this.state.hours} HOURS, {this.state.minutes} MINUTES AND {this.state.seconds} SECONDS
            </div>
        );
    }
}

export default Timer;
