import React, { Component } from 'react'

import Haaton0_0 from '../../assets/miscellaneous/haaton0.png';
import Haaton0_1 from '../../assets/miscellaneous/haaton1.png';
import Haaton1_0 from '../../assets/miscellaneous/haaton0-armsup.png';
import Haaton1_1 from '../../assets/miscellaneous/haaton1-armsup.png';

import './timer.css';

interface TimerState 
{
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
}

interface TimerProps 
{
    date: string;
}

export default class Timer extends Component<TimerProps, TimerState>
{

    timerid: any;
    state: TimerState = {
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
        }, 1000);
    }

    componentDidUnmount(): void 
    {
        clearInterval(this.timerid);
    }

    updateTime(): void
    {
        const diff = (new Date(this.props.date)).getTime() - (new Date()).getTime();
        if (diff > 0)
        {
            this.setState({
                days     :   Math.floor( diff / (1000 * 60 * 60 * 24)),
                hours    :   Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes  :   Math.floor((diff / 1000 / 60) % 60),
                seconds  :   Math.floor((diff / 1000) % 60)
            });
        }
    }

    render()
    {
        return (
            <div className="timer-flexbox">
                <div className="timer-container">
                    <div className="timer-counter">
                        {this.state.days} Days, {this.state.hours} Hours, {this.state.minutes} Minutes and {this.state.seconds} Seconds
                    </div>
                </div>
            </div>
        );
    }
}
