import React from "react";
import BaseCard, {BaseCardProps, BaseCardState} from "./../../shared/baseCard/baseCard";
import {Game} from "../../../models/game";
import { ExternalLink } from "../../../models/url";
import GameWindow from "./../gameWindow";
import './../game.css'
import {IconButton} from "@material-ui/core";
import {PlayCircleOutline} from "@material-ui/icons";

export interface GameCardProps extends BaseCardProps<Game> {
}

export interface GameCardState extends BaseCardState {
    touched: boolean;
    renderGame: boolean;
}

export default class GameCard extends BaseCard<Game, GameCardProps, GameCardState> {

    constructor(props: GameCardProps) {
        super(props);
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

    renderGameThumbnail(url: ExternalLink) {
        return(
            //for when the thumbnail will be available
            // <img alt={linkToString(this.props.object.gameLink)} src={linkToString(this.props.object.thumbnail)}/>
            <div className="game-placeholder"/>
        )
    }

    renderGameWindow(gameURl: ExternalLink): JSX.Element {
        return(
            <GameWindow gameURL={gameURl} close={this.toggleGame.bind(this)}/>
        )
    }

    renderGame(): JSX.Element {
        return (
            <div>
                <div className="button-row">
                    <div className="game-text">{this.props.object.title}</div>
                    <IconButton onClick={this.toggleGame}>
                        <PlayCircleOutline style={{fontSize: 50, color: 'white'}}/>
                    </IconButton>
                </div>
                {this.renderGameThumbnail(this.props.object.thumbnail)}
                <div className="game-description">{this.props.object.description}</div>
                {this.state.renderGame ?
                    this.renderGameWindow(this.props.object.gameLink) :
                    <div/>}
            </div>
        )
    }

    render(): JSX.Element {
        return this.renderCard(this.renderGame());
    }
}
