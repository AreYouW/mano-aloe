import React from 'react';
import './game.css'
import {IconButton} from "@material-ui/core";
import {Cancel} from "@material-ui/icons";

export interface GameWindowProps {
    gameURL: URL;
    close: () => void;
}

export interface GameWindowState {
}

export default class GameWindow extends React.Component<GameWindowProps, GameWindowState> {

    constructor(props: GameWindowProps) {
        super(props);
    }


    renderGame(): JSX.Element {
        return (
            <iframe className="game-tag" src={this.props.gameURL.toString()}/>
        )
    }

    render() {
        return (
            <div>
                <div className="game-background"/>
                <div className="game-container center">
                    <IconButton
                        className="game-exit-button"
                        onClick={this.props.close}>
                        <Cancel style={{fontSize: 50, color: 'white'}}/>
                    </IconButton>
                    {this.renderGame()}
                </div>
            </div>

        )
    }
}
