import React from 'react';
import MessageCardSection from '../../components/messageCardSection/messageCardSection';
import {Game} from "../../models/game";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import './game.css'
import {Grid} from "@material-ui/core";
import AloeHeartIcon from './../../assets/icons/AloeHeartIcon.png'

export interface GamePageProps {

}

export interface GamePageState {
    loading: boolean;
    renderGame: boolean;
    games: Game[];
    touched: boolean;
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.showGame = this.showGame.bind(this);
    }

    state: GamePageState = {
        loading: true,
        games: [],
        renderGame: false,
        touched: false
    }

    componentDidMount() {
        GamePage.getData();
    }

    toggleTouched = () => {
        this.setState( prevState => ({
            touched: !prevState.touched
        }));
    }

    handleMouseUp = () => {
        setTimeout( () => {
            this.setState({ touched: false });
        }, 150);
    }

    private static getData(): void {
        return
    }

    showGame(): void {
        this.setState({renderGame: true});
    }

    renderGame(): JSX.Element {
        return (
            <iframe className="game-tag" src="https://iskorsukov.github.io/JourneyToHololive/"/>
        )
    }

    renderPlaceholder(): JSX.Element {
        const className = this.state.touched ? 'btn touched' : 'btn';
        return (
            <button
                className={className}
                onMouseDown={this.toggleTouched}
                onMouseUp={this.handleMouseUp}
                onClick={this.showGame}>
                <img className="App-logo" src={AloeHeartIcon} alt="logo" />
            </button>
        )
    }

    render() {
        return (
            <section id='anchor'>
               <div className="wrapper-overlay">
								 <div className="game-container center">
										{this.state.renderGame ? this.renderGame() : this.renderPlaceholder()}
								</div>
               </div>
            </section>
        )
    }
}
