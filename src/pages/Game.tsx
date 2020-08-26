import React from 'react';
import MessageCardSection from '../components/messageCardSection/messageCardSection';
import {Game} from "../models/game";
import ManoAloeService from "../controllers/mano-aloe.service";
import SessionService from "../services/session.service";
import './Game.css'

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
  }

  state: GamePageState = {
    loading: true,
    games: []
  }

  componentDidMount() {
    this.getData();
  }

  private getData(): void {
    return
  }

  renderMessageCardSection() {
    return (
      <div>
        GAME PAGE UNDER CONSTRUCTION
      </div>
    )
  }

  render() {
    return (
      <div className="wrapper-overlay">
        GAME PAGE
      </div>
    )
  }
}
