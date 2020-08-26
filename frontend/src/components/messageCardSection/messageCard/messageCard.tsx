import React from "react";
import CSS from 'csstype';
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import { Country } from "../../../models/country";
import { Message } from "../../../models/message";
import CardStyle1 from "../../../assets/card1.svg";
import CardStyle2 from "../../../assets/card2.png";
import CardStyle3 from "../../../assets/card3.png";
import DisplayedLanguage from "../../../models/language";
import { ReactComponent as TranslateBotan } from "../../../assets/translateIcon.svg";
import "./messageCard.css";


const CardStyleArr: Array<string> = [CardStyle1, CardStyle2, CardStyle3]

interface MessageCardProps {
    message: Message;
    cardStyleNum: number;
    inViewport: boolean;
    language: DisplayedLanguage;
}

interface MessageCardState {
    currentLanguage: DisplayedLanguage;
    globalLanguage: DisplayedLanguage;
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

class MessageCardPrivate extends React.Component<MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly cardStyleNum: number;
    private readonly flag: string;
    private readonly hasTlMsg: boolean;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.message;
        this.flag = countryCodeToFlag(props.message.country);
        this.cardStyleNum = props.cardStyleNum;
        this.hasTlMsg = this.message.tl_msg.length > 0;

        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
    }

    private getCurrentLanguage(): DisplayedLanguage {
        return this.state.currentLanguage;
    }

    private setCurrentLanguage(language: DisplayedLanguage): void {
        this.setState({currentLanguage: language});
    }

    private toggleCurrentLanguage(): void {
        this.setState(state => ({
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

    render() {
        // need to leave styling here, so I can decide background image based on props
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
            opacity: (this.props.inViewport ? 1 : 0),
        };

        return (
            <div className="message-card" style={rootStyles}>
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
                    <div className="clear"></div>
                </div>
                <div className="message-card-footer">
                    {this.message.username} {this.flag}
                </div>
                {this.hasTlMsg &&
                    <TranslateBotan className="message-card-translate" onMouseDown={this.toggleCurrentLanguage} />
                }
            </div>
        )
    }
}

const MessageCard = handleViewport(MessageCardPrivate);
export default MessageCard;
