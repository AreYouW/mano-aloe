import React from 'react';
import MessageCardSection from '../components/messageCardSection/messageCardSection';
import {Artwork} from "../models/artwork";
import ManoAloeService from "../controllers/mano-aloe.service";
import SessionService from "../services/session.service";
import './Art.css'

export interface ArtPageProps {

}

export interface ArtPageState {
  loading: boolean;
  artworks: Artwork[];
}

export default class ArtPage extends React.Component<ArtPageProps, ArtPageState> {

  constructor(props: ArtPageProps,
              private manoAloeService: ManoAloeService) {
    super(props);
    this.manoAloeService = new ManoAloeService();
  }

  state: ArtPageState = {
    loading: true,
    artworks: []
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
          ART PAGE UNDER CONSTRUCTION
        </div>
     )
  }

  render() {
    return (
      <div className="wrapper-overlay">
        ART PAGE
      </div>
    )
  }
}
