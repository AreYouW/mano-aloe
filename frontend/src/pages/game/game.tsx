import React from 'react';
import {Game} from "../../models/game";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service"
import '../../components/gamesSection/gameSection.css'
import GameSection from "../../components/gamesSection/gameSection";
import '../../shared/globalStyles/global.css'

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
        const cachedGames: Game[] | null = SessionService.getGames();
        if (cachedGames && cachedGames.length) {
            this.setState({loading: false, games: cachedGames});
        } else {
            this.manoAloeService.getAllGames()
                .then((games: Game[]) => {
                    SessionService.saveGames(games);
                    this.setState({loading: false, games});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
    }

    render() {
        return (
            <section id='anchor'>
                <div className="separator"/>
                <div className="wrapper-overlay">
                    <GameSection data={this.state.games}/>
                </div>
            </section>
        )
    }
}
