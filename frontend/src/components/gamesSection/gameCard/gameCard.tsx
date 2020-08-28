import React from "react";
import BaseCard, {BaseCardProps, BaseCardState} from "./../../shared/baseCard/baseCard";
import {Game} from "../../../models/game";
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

    renderGameThumbnail(url: URL) {
        return(
            //for when the thumbnail will be available
            // <img alt={this.props.object.gameLink.toString()} src={this.props.object.thumbnail.toString()}/>
            <div className="game-placeholder"/>
        )
    }

    renderGameWindow(gameURl: URL): JSX.Element {
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
