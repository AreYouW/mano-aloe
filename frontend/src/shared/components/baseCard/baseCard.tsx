import React from "react";
import DisplayedLanguage from "../../../models/language";
import CSS from "csstype";
import CardStyle1 from "../../../assets/cards/card1.svg";
import CardStyle2 from "../../../assets/cards/card2.png";
import CardStyle3 from "../../../assets/cards/card3.png";
import './baseCard.css';
import handleViewport from "react-in-viewport";
import VisibilitySensor from "react-visibility-sensor";

const CardStyleArr: Array<string> = [CardStyle1, CardStyle2, CardStyle3]

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
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
            opacity: (this.state.inViewport ? 1 : 0),
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

// export default handleViewport(BaseCard);

