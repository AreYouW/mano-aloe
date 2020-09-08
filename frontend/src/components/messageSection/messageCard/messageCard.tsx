import React from "react";
import CSS from 'csstype';
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import {Country} from "../../../models/country";
import {Message} from "../../../models/message";
import CardStyle1 from "../../../assets/cards/card1.svg";
import CardStyle2 from "../../../assets/cards/card2.png";
import CardStyle3 from "../../../assets/cards/card3.png";
import DisplayedLanguage from "../../../models/language";
import {ReactComponent as TranslateBotan} from "../../../assets/icons/translateIcon.svg";
import "./messageCard.css";
import { Twemoji } from 'react-emoji-render';
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";

interface MessageCardProps extends BaseCardProps<Message>{
}

interface MessageCardState extends BaseCardState{
}

function countryCodeToFlag(code: Country): string {
    // Offset between Latin uppercase A-Z and Regional Indicator Symbols A-Z
    const RI_OFFSET = 0x1F1A5;

    if (code.length !== 2) return "";

    let first = code.charCodeAt(0);
    if (first < 0x41 && first > 0x5A) return "";
    first += RI_OFFSET;

    let second = code.charCodeAt(1);
    if (second < 0x41 && second > 0x5A) return "";
    second += RI_OFFSET;

    return String.fromCodePoint(first, second);
}

export default class MessageCard extends BaseCard<Message, MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly flag: string;
    private readonly hasTlMsg: boolean;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.object;
        this.flag = countryCodeToFlag(props.object.country);
        this.hasTlMsg = this.message.tl_msg.length > 0;

        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
    }

    private toggleCurrentLanguage(): void {
        this.setState((state: MessageCardState) => ({
            currentLanguage: state.currentLanguage === DisplayedLanguage.Original
                ? DisplayedLanguage.Japanese
                : DisplayedLanguage.Original
        }));
    }

    componentWillMount() {
        this.setState({
            currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
            globalLanguage: this.props.language
        });
    }

    componentDidUpdate() {
        if (this.state.globalLanguage !== this.props.language) {
            this.setState({
                currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
                globalLanguage: this.props.language
            });
        }
    }

    renderMessage() {
        return (
            <div>
                <div className="message-card-text-container">
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Original,
                    })}>
                        <div>{this.message.orig_msg}</div>
                    </div>
                    {this.hasTlMsg &&
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Japanese,
                    })}>
                        <div>{this.message.tl_msg}</div>
                    </div>
                    }
                    <div className="clear"/>
                </div>
                <div className="message-card-footer">
                    {this.message.username}
                    <Twemoji text={this.flag} />
                </div>
                {this.hasTlMsg &&
                <TranslateBotan className="message-card-translate" onMouseDown={this.toggleCurrentLanguage} />
                }
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderMessage());
    }
}