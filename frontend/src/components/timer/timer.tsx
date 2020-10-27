import React, { Component } from 'react'
import {Cancel} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

import Coco_Dragon_1 from '../../assets/timer/Coco_Dragon_1.png';
import Coco_Dragon_2 from '../../assets/timer/Coco_Dragon_2.png';
import Coco_Dragon_3 from '../../assets/timer/dragon0.png';
import Coco_Dragon_4 from '../../assets/timer/dragon1.png';
import Haaton_1 from '../../assets/timer/Haaton_1.png';
import Haaton_2 from '../../assets/timer/Haaton_2.png';
import Haaton_3 from '../../assets/timer/haaton0.png';
import Haaton_4 from '../../assets/timer/haaton1.png';
import Haaton_5 from '../../assets/timer/haaton0-armsup.png';
import Haaton_6 from '../../assets/timer/haaton1-armsup.png';

import './timer.css';

interface TimerState
{
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
    isFinale:   boolean;
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
        seconds: 0,
        isFinale: false
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
        } else {
            this.setState({isFinale: true})
            clearInterval(this.timerid);
        }
    }

    render() {
        const popupstyle = {
            display: this.state.isFinale ? 'inherit' : 'none',
            width: '300px',
            zIndex: 69,
            border: 'none',
            backgroundColor: '#333031',
            color: '#ffffff',
            padding: '5px',
        }
        const buttonstyle = {
            display: this.state.isFinale ? 'flex' : 'none',
            alignSelf: 'flex-start',
            marginLeft: '-1vw',
            marginTop: '-3vw',
            disableRipple: true,
            backgroundColor: 'transparent',
            color: '#fff',
        }
        //I am well aware that this is such a scuffed way of doing this but I don't care
        return (
            <React.Fragment>
                <div style={ popupstyle }>
                    <iframe src="https://www.youtube-nocookie.com/embed/vHOmLRcCVQ0"/>
                    <IconButton onClick={() => {this.setState({isFinale: false})}} style={buttonstyle}>
                        <Cancel />
                    </IconButton>
                </div>
                <div className="justify-center">
                    <div className="timer-container">
                        <div className="timer-overlay">
                            <img src={Coco_Dragon_1} id="coco1"   title="Drawn by Porukana (@Porukana_Art)"  className="sprite" />
                            <img src={Coco_Dragon_2} id="coco2"   title="Drawn by Porukana (@Porukana_Art)"  className="sprite" />
                            <img src={Coco_Dragon_3} id="coco3"   title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" style={ { display: this.state.isFinale ? 'none' : 'inherit' } }/>
                            <img src={Coco_Dragon_4} id="coco4"   title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" />
                            <img src={Haaton_1}      id="haaton1" title="Drawn by Porukana (@Porukana_Art)"  className="sprite" />
                            <img src={Haaton_2}      id="haaton2" title="Drawn by Porukana (@Porukana_Art)"  className="sprite" />
                            <img src={Haaton_3}      id="haaton3" title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" style={ { display: this.state.isFinale ? 'none' : 'inherit' } }/>
                            <img src={Haaton_4}      id="haaton4" title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" />
                            <img src={Haaton_5}      id="haaton5" title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" />
                            <img src={Haaton_6}      id="haaton6" title="Drawn by Peanuts (@PistachiosChips)"   className="sprite-large" style={ { display: this.state.isFinale ? 'none' : 'inherit' } } />
                        </div>
                        <div className="timer-counter">
                            <div className="timer-item">
                                <div className="timer-value">
                                    {this.state.days}
                                </div>
                                <div className="timer-unit">
                                    Days
                                </div>
                            </div>
                            <div className="timer-item">
                                <div className="timer-value">
                                    {this.state.hours}
                                </div>
                                <div className="timer-unit">
                                    Hours
                                </div>
                            </div>
                            <div className="timer-item">
                                <div className="timer-value">
                                    {this.state.minutes}
                                </div>
                                <div className="timer-unit">
                                    Minutes
                                </div>
                            </div>
                            <div className="timer-item">
                                <div className="timer-value">
                                    {this.state.seconds}
                                </div>
                                <div className="timer-unit">
                                    Seconds
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
