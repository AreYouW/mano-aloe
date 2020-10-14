import React, { Component } from 'react'

import Coco_Dragon_1 from '../../assets/timer/Coco_Dragon_1.png';
import Coco_Dragon_2 from '../../assets/timer/Coco_Dragon_2.png';
import Haaton_1 from '../../assets/timer/Haaton_1.png';
import Haaton_2 from '../../assets/timer/Haaton_2.png';

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
            <div className="timer-center">
                <div className="timer-container">
                    <div className="overlay">
                        <img src={Coco_Dragon_1} className="image" style={{ top: "0px", left: "0px" }}/>
                        <img src={Coco_Dragon_2} className="image" style={{ top: "0px", right: "0px" }}/>
                        <img src={Haaton_1} className="image" style={{ bottom: "0px", left: "0px" }}/>
                        <img src={Haaton_2} className="image" style={{ bottom: "0px", right: "0px" }}/>
                    </div>
                    <div className="timer-counter">
                        <div className="timer-item">
                            <div>
                                {this.state.days}
                            </div>
                            <div>
                                Days
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.hours}
                            </div>
                            <div>
                                Hours 
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.minutes}
                            </div>
                            <div>
                                Minutes
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.seconds}
                            </div>
                            <div>
                                Seconds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
