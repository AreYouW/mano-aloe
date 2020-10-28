import React from "react";
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";
import {Game} from "../../../models/game";
import {linkToString} from "../../../models/url";
import GameWindow from "./../gameWindow";
import {IconButton} from "@material-ui/core";
import {ImageRounded, PlayCircleOutline, Launch} from "@material-ui/icons";
import '../gameSection.css'
import './gameCard.css'

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
        globalLanguage: this.props.language,
        inViewport: false
    }

    toggleTouched = () => {
        this.setState((prevState: GameCardState) => ({
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

    launchGameNewWindow(gameURL: string): void {
        window.open(gameURL)
    }

    checkIfThumbnailPresent(): boolean {
        return this.props.object.thumbnail !== "" && this.props.object.thumbnail !== undefined;
    }

    renderThumbnailPlaceholder(): JSX.Element {
        return (
            <div className="game-thumbnail-placeholder center">
                <ImageRounded className="absolute-center" style={{fontSize: 50, color: 'white'}}/>
            </div>
        )
    }

    renderGameThumbnail(): JSX.Element {
        return (
            <div className="game-thumbnail-container">
                {this.checkIfThumbnailPresent() ?
                    <img className="game-thumbnail" alt={linkToString(this.props.object.gameLink)} src={this.props.object.thumbnail}/> :
                    this.renderThumbnailPlaceholder()
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
        const gameUrl = linkToString(this.props.object.gameLink);
        return (
            <div>
                <div className="button-row">
                    <div className="game-text">{this.props.object.title}</div>
                    <div className="button-right">
                        <IconButton onClick={this.toggleGame}>
                            <PlayCircleOutline style={{fontSize: 50, color: 'white'}}/>
                        </IconButton>
                        <IconButton onClick={() => this.launchGameNewWindow(gameUrl)}>
                            <Launch style={{fontSize: 50, color: 'white'}}/>
                        </IconButton>
                    </div>
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
