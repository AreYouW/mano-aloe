import React from "react";
import DisplayedLanguage from "../../../models/language";
import CSS from "csstype";
// Throwing in a fake card style in until we have actual cards
import CardStyle1 from "../../../assets/cards/fake_card.svg";
import CardStyle2 from "../../../assets/cards/fake_card.svg";
import './baseCard.css';
import handleViewport from "react-in-viewport";
import VisibilitySensor from "react-visibility-sensor";

const CardStyleArr: Array<Array<string>> = [
    [CardStyle1, "#890620"],
    [CardStyle2, "#3f6fb9"]
]

export const CardStyleLength: number = CardStyleArr.length

export interface BaseCardProps<T> {
    object: T;
    cardStyleNum: number;
    language: DisplayedLanguage;
}

export interface BaseCardState {
    currentLanguage: DisplayedLanguage;
    globalLanguage: DisplayedLanguage;
    inViewport: boolean;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends React.Component<P, S> {
    public readonly cardStyleNum: number;

    constructor(props: P) {
        super(props);
        this.cardStyleNum = props.cardStyleNum;
    }

    state = {
        currentLanguage: this.props.language,
        globalLanguage: this.props.language,
        inViewport: false
    } as S

    private toggleVisibility(inViewport: boolean): void {
        this.setState({inViewport});
    }

    public renderCard(content: JSX.Element): JSX.Element {
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum][0]})`,
            opacity: (this.state.inViewport ? 1 : 0),
            backgroundColor: `${ CardStyleArr[this.cardStyleNum][1] }`,
        };
        return(
            <VisibilitySensor onChange={this.toggleVisibility.bind(this)} partialVisibility>
                <div className="base-card" style={rootStyles}>
                    {content}
                </div>
            </VisibilitySensor>
        );
    }
}
