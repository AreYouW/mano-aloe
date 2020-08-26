import React from 'react';
import './artworkCard.css';

interface ArtworkCardProps {

}

interface ArtworkCardState {

}

export default class ArtworkCard extends React.Component<ArtworkCardProps, ArtworkCardState> {
    constructor(props: ArtworkCardProps) {
        super(props);
    }

    render() {
        return (
            <div className="artwork-card">

            </div>
        )
    }
}
