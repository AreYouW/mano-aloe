import React from "react";
import DisplayedLanguage from "../../../models/language";
import CSS from "csstype";
import CardStyle1 from "../../../assets/cards/card1.svg";
import CardStyle2 from "../../../assets/cards/card2.png";
import CardStyle3 from "../../../assets/cards/card3.png";
import '../../messageCardSection/messageCard/messageCard.css';

const CardStyleArr: Array<string> = [CardStyle1, CardStyle2, CardStyle3]

export interface BaseCardProps<T> {
    object: T;
    cardStyleNum: number;
    language: DisplayedLanguage;
}

export interface BaseCardState {
    currentLanguage: DisplayedLanguage;
    globalLanguage: DisplayedLanguage;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends React.Component<P, S> {
    public readonly cardStyleNum: number;

    constructor(props: P) {
        super(props);
        this.cardStyleNum = props.cardStyleNum;
    }

    state = {
        currentLanguage: this.props.language,
        globalLanguage: this.props.language
    } as S

    renderCard(content: JSX.Element): JSX.Element {
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
        };
        return(
            <div className="message-card" style={rootStyles}>
                {content}
            </div>
        );
    }
}
