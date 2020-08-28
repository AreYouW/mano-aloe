import React from 'react';
import handleViewport from 'react-in-viewport';
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';

interface ArtworkCardProps {
    artwork: Artwork,
    inViewport: boolean,
}

interface ArtworkCardState {
    image: string,
}

class ArtworkCard extends React.Component<ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.artwork;
    }

    state: ArtworkCardState = {
        image: "",
    }

    private setImage() {
        if (this.props.inViewport && this.state.image === "") {
            this.setState({
                image: this.artwork.artworkLink.toString(),
            });
        }
    }

    componentWillMount() {
        this.setImage();
    }

    componentDidUpdate() {
        this.setImage();
    }

    render() {
        return (
            <div className="artwork-card">
                <div className="artwork-card-img">
                    {/* <div className="placeholder"></div> */}
                    <div className="image" style={{
                        backgroundImage: this.state.image === "" ? "none" : `url("${this.state.image}")`,
                    }}></div>
                </div>
                <div className="artwork-card-footer">
                    <div className="title"><a href={this.artwork.artworkLink.toString()}>{this.artwork.title}</a></div>
                    <div className="artist"><a href={this.artwork.artistLink.toString()}>{this.artwork.username}</a></div>
                </div>
            </div>
        )
    }
}

export default handleViewport(ArtworkCard, { rootMargin: "0px 0px 250px 0px" }, { disconnectOnLeave: true });
