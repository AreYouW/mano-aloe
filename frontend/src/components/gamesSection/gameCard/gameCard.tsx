import React from "react";
import BaseCard, {BaseCardProps, BaseCardState} from "./../../shared/baseCard/baseCard";
import {Game} from "../../../models/game";
import { ExternalLink } from "../../../models/url";
import GameWindow from "./../gameWindow";
import './../game.css'
import {IconButton} from "@material-ui/core";
import {Camera, Image, ImageRounded, PlayCircleOutline} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";

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

    checkIfThumbnailPresent(): boolean {
        return this.props.object.thumbnail.toString() !== "";
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
                    <img alt={this.props.object.gameLink.toString()} src={this.props.object.thumbnail.toString()}/>
                }
            </div>
        )
    }

    renderGameWindow(): JSX.Element {
        return(
            <GameWindow gameURL={this.props.object.gameLink} close={this.toggleGame.bind(this)}/>
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
                {this.renderGameThumbnail()}
                <div className="game-description">{this.props.object.description}</div>
                {this.state.renderGame ?
                    this.renderGameWindow() :
                    <div/>}
            </div>
        )
    }

    render(): JSX.Element {
        return this.renderCard(this.renderGame());
    }
}
