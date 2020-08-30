import React from 'react';
import {Game} from "../../models/game";
import ManoAloeService from "../../controllers/mano-aloe.service";
import '../../components/gamesSection/game.css'
import games from './../../tempGameStash/games.json'
import GameSection from "../../components/gamesSection/gameSection";

export interface GamePageProps {

}

export interface GamePageState {
    loading: boolean;
    games: Game[];
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.getData = this.getData.bind(this);
    }

    state: GamePageState = {
        loading: true,
        games: [],
    }

    componentDidMount() {
        this.getData();
    }



    private getData(): void {
        const mappedGames: Game[] =  games.map((game: { gameID: string; title: string; description: string; thumbnail: string; gitLink: string; gameLink: string; }, idx) => {
            return {
                gameID: parseInt(game.gameID),
                title: game.title,
                description: game.description,
                thumbnail: game.thumbnail,
                gitLink: new URL(game.gitLink),
                gameLink: new URL(game.gameLink),
            } as Game
        });
        this.setState({games: mappedGames, loading: false});
    }

    render() {
        return (
            <section id='anchor'>
                <div className="separator"/>
                <div className="wrapper-overlay">
                    <div className="notice-center">
                        <div className="notice-container">
                            <div className="notice-content">
                                <p>
                                Work in Progress! Game devs are still hard at work! Check back in a few days.
                                </p>
                                <p>
                                ゲームはまだ開発中です。ゲームデベロッパーは仕事に精を出しています！数日後、またチェックしてくださいね。
                                </p>
                            </div>
                        </div>
                    </div>
                    <GameSection data={this.state.games}/>
                </div>
            </section>
        )
    }
}
