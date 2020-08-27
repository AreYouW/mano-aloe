import React from 'react';
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';

interface ArtworkCardProps {
    artwork: Artwork,
}

interface ArtworkCardState {

}

export default class ArtworkCard extends React.Component<ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.artwork;
    }

    render() {
        return (
            <div className="artwork-card">
                <div className="artwork-card-img"></div>
                <div className="artwork-card-footer">
                    <div className="title">{this.artwork.title}</div>
                    <div className="artist">{this.artwork.username}</div>
                </div>
            </div>
        )
    }
}
