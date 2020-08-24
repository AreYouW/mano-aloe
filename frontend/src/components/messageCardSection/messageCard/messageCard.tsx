import React from "react";
import VisibilitySensor from "react-visibility-sensor";

import {Message} from "../../../models/message";
import CardStyle1 from "../../../assets/card1.png"
import CardStyle2 from "../../../assets/card2.png";
import CardStyle3 from "../../../assets/card3.png";
import "./messageCard.css";

import CSS from 'csstype';

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
    isVisible: boolean;
}

export default class MessageCard extends React.Component<MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly cardStyleNum: number;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.message;
        this.cardStyleNum = props.cardStyleNum;

        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
    }

    state: MessageCardState = {
        currentLanguage: DisplayedLanguage.Original,
        isVisible: true
    }

    private getCurrentLanguage(): DisplayedLanguage {
        return this.state.currentLanguage;
    }

    private setCurrentLanguage(language: DisplayedLanguage): void {
        this.setState({currentLanguage: language});
    }

    private setVisibility(isVisible: boolean) : void {
        if (isVisible !== this.state.isVisible) {
            this.setState({isVisible});
        }
    }

    private toggleCurrentLanguage(): void {
        this.setState(state => ({
            currentLanguage: state.currentLanguage === DisplayedLanguage.Original
                ? DisplayedLanguage.Japanese
                : DisplayedLanguage.Original
        }));
    }

    render() {
        // need to leave styling here, so I can decide background image based on props
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
            animation: (this.state.isVisible ? "fadeIn 1s" : ""),
            opacity: (this.state.isVisible ? 1 : 0)
        };

        return (
            <VisibilitySensor
                onChange={(isVisible) => this.setVisibility(isVisible)}
                partialVisibility
            >
                <div className="message-card" style={rootStyles}>
                    <div className="message-card-text-container">
                        <div className={`message-card-text ${this.state.currentLanguage === DisplayedLanguage.Original && "active-message"}`}>
                            <div>{this.message.orig_msg}</div>
                        </div>
                        {this.message.tl_msg &&
                            <div className={`message-card-text ${this.state.currentLanguage === DisplayedLanguage.Japanese && "active-message"}`}>
                                <div>{this.message.tl_msg}</div>
                            </div>
                        }
                        <div className="clear"></div>
                    </div>
                    <div className="message-card-footer">
                        {this.message.username} {this.message.country}
                    </div>
                    {this.message.tl_msg && 
                        <div className="message-card-translate" onClick={this.toggleCurrentLanguage}>
                            transleet botan
                        </div>
                    }
                </div>
            </VisibilitySensor>
        )
    }
}
