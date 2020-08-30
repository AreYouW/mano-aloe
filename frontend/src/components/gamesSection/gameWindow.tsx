import React from 'react';
import './gameSection.css'
import {IconButton} from "@material-ui/core";
import {Cancel} from "@material-ui/icons";
import { linkToString, ExternalLink } from '../../models/url';

export interface GameWindowProps {
    gameURL: ExternalLink;
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
            <iframe className="game-tag" src={linkToString(this.props.gameURL)}/>
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
