import React from "react";
import CSS from 'csstype';
import handleViewport from 'react-in-viewport';
import BaseCard, {BaseCardProps, BaseCardState} from "./../../shared/baseCard/baseCard";
import {Game} from "../../../models/game";
import {ExternalLink, linkToString} from "../../../models/url";
import GameWindow from "./../gameWindow";
import './../game.css'
import CardStyle1 from "../../../assets/cards/card1.svg";
import CardStyle2 from "../../../assets/cards/card2.png";
import CardStyle3 from "../../../assets/cards/card3.png";
import DisplayedLanguage from "../../../models/language";
import {IconButton} from "@material-ui/core";
import {Camera, Image, ImageRounded, PlayCircleOutline} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";

const CardStyleArr: Array<string> = [CardStyle1, CardStyle2, CardStyle3]

export interface GameCardProps {
    game: Game,
    cardStyleNum: number;
    inViewport: boolean;
    language: DisplayedLanguage;
}

export interface GameCardState {
    touched: boolean;
    renderGame: boolean;
    currentLanguage: DisplayedLanguage;
    globalLanguage: DisplayedLanguage;
}

class GameCard extends React.Component<GameCardProps, GameCardState> {
    private readonly game: Game;
    private readonly cardStyleNum: number;

    constructor(props: GameCardProps) {
        super(props);
        this.game = props.game;
        this.cardStyleNum = props.cardStyleNum;
        this.toggleGame = this.toggleGame.bind(this);
    }

    state: GameCardState = {
        touched: false,
        renderGame: false,
        currentLanguage: this.props.language,
        globalLanguage: this.props.language
    }

    toggleTouched = () => {
        this.setState(prevState => ({
            touched: !prevState.touched
        }));
    }

    handleMouseUp = () => {
        setTimeout(() => {
            this.setState({touched: false});
        }, 150);
    }


    toggleGame(): void {
        this.setState({renderGame: !this.state.renderGame})
    }

    checkIfThumbnailPresent(): boolean {
        return linkToString(this.props.game.thumbnail) !== "";
    }

    renderThumbnailPlaceholder(): JSX.Element {
        return (
            <div className="game-thumbnail-placeholder center">
                <ImageRounded style={{fontSize: 50, color: 'white'}}/>
            </div>
        )
    }

    renderGameThumbnail(): JSX.Element {
        return (
            <div className="game-thumbnail">
                {this.checkIfThumbnailPresent() ?
                    this.renderThumbnailPlaceholder() :
                    <img alt={linkToString(this.props.game.gameLink)} src={linkToString(this.props.game.thumbnail)}/>
                }
            </div>
        )
    }

    renderGameWindow(): JSX.Element {
        return(
            <GameWindow gameURL={this.props.game.gameLink} close={this.toggleGame.bind(this)}/>
        )
    }

    // renderGame(): JSX.Element {
    //     return (
    //         <div>
    //             <div className="button-row">
    //                 <div className="game-text">{this.props.game.title}</div>
    //                 <IconButton onClick={this.toggleGame}>
    //                     <PlayCircleOutline style={{fontSize: 50, color: 'white'}}/>
    //                 </IconButton>
    //             </div>
    //             {this.renderGameThumbnail()}
    //             <div className="game-description">{this.props.game.description}</div>
    //             {this.state.renderGame ?
    //                 this.renderGameWindow() :
    //                 <div/>}
    //         </div>
    //     )
    // }

    // render(): JSX.Element {
    //     return this.renderCard(this.renderGame());
    // }

    render() {
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum]})`,
            opacity: (this.props.inViewport ? 1 : 0),
        };

        return (
            <div className="message-card" style={rootStyles}>
                <div className="button-row">
                    <div className="game-text">{this.props.game.title}</div>
                    <IconButton onClick={this.toggleGame}>
                        <PlayCircleOutline style={{fontSize: 50, color: 'white'}}/>
                    </IconButton>
                </div>

                <div className="game-thumbnail">
                    {<img alt={linkToString(this.props.game.gameLink)} src={linkToString(this.props.game.thumbnail)}/>}
                </div>

                <div className="game-description">{this.props.game.description}</div>
                {this.state.renderGame ?
                    this.renderGameWindow() :
                    <div/>}
            </div>
        )
    }
}

export default handleViewport(GameCard);
