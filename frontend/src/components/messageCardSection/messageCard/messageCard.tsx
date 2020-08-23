import React from "react";
import {Card, CardActionArea, CardActions, CardContent, IconButton, Typography} from "@material-ui/core";
import JapanFlagImg from "../../../assets/ICON_RESIZED-Flag_of_Japan.svg.png";
import LanguageIcon from "@material-ui/icons/Language";
import {Message} from "../../../models/message";
import CardStyle1 from "../../../assets/card1.png"
import CardStyle2 from "../../../assets/card2.png";
import CardStyle3 from "../../../assets/card3.png";
import LazyLoad from "react-lazyload";
import "./messageCard.css";

import CSS from 'csstype';

import './messageCard.css';

const CardStyleArr: Array<string> = [CardStyle1, CardStyle2, CardStyle3]

enum DisplayedLanguage {
    Original,
    Japanese,
}

interface MessageCardProps {
    message: Message;
    cardStyleNum: number;
}

interface MessageCardState {
    currentLanguage: DisplayedLanguage;
}

export default class MessageCard extends React.Component<MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly cardStyleNum: number;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.message;
        this.cardStyleNum = props.cardStyleNum;
    }

    state: MessageCardState = {
        currentLanguage: DisplayedLanguage.Original
    }

    private getCurrentLanguage(): DisplayedLanguage {
        return this.state.currentLanguage;
    }

    private setCurrentLanguage(language: DisplayedLanguage): void {
        this.setState({currentLanguage: language});
    }

    private renderMessage(language: DisplayedLanguage, message: Message): JSX.Element {
        if (language === DisplayedLanguage.Japanese) {
            return <Typography variant="h5" component="h2">{message.tl_msg}</Typography>
        }
        return <Typography>{message.orig_msg}</Typography>
    }

    render() {
        const handleCardClick = () => {
            console.log(this.message)
        }
        // need to leave styling here, so I can decide background image based on props
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
        };

        return (
            <LazyLoad once height={650} offset={0}>
                {/* <Card style={{...rootStyles, animation: "fadeIn 1s"}}>
                    <CardActions>
                        <IconButton onClick={() => this.setCurrentLanguage(DisplayedLanguage.Japanese)}>
                            <img src={JapanFlagImg} alt="Japan Flag" />
                        </IconButton>
                        <IconButton onClick={() => this.setCurrentLanguage(DisplayedLanguage.Original)}>
                            <LanguageIcon fontSize="large" />
                        </IconButton>
                    </CardActions>
                    <CardActionArea onClick={handleCardClick}>
                        <CardContent>
                            { messageText }
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.message.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.message.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card> */}

                <div className="message-card" style={{...rootStyles, animation: "fadeIn 1s"}}>
                    <div className="message-card-text" style={{}}>
                        <span style={{display: "inline-block"}}>{this.message.tl_msg}</span>
                    </div>
                    <div className="message-card-text" style={{}}>
                        <span style={{display: "inline-block"}}>{this.message.orig_msg}</span>
                    </div>
                </div>
            </LazyLoad>
        )
    }
}
