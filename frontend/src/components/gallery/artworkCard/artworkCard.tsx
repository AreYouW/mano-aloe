import React from 'react';
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';
import { linkToString } from '../../../models/url';

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface ArtworkCardProps {
    artwork: Artwork,
    inViewport: boolean,
}

interface ArtworkCardState {
    loadingState: ImageLoadingState,
}

class ArtworkCard extends React.Component<ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;
    private imageElement: HTMLImageElement;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.artwork;
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    state: ArtworkCardState = {
        loadingState: ImageLoadingState.NotLoaded,
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.props.inViewport && this.state.loadingState === ImageLoadingState.NotLoaded) {
            this.imageElement.src = linkToString(this.artwork.artworkLink);
            this.imageElement.addEventListener("load", this.imageLoaded);

            this.setState({
                loadingState: ImageLoadingState.Loading,
            });
        }
    }

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate() {
        this.setImage();
    }

    render() {
        const hasLoaded = this.state.loadingState === ImageLoadingState.Loaded;
        const artworkLink = linkToString(this.artwork.artworkLink);
        const backgroundImage = hasLoaded ? `url("${artworkLink}")` : "none";

        return (
            <div className="artwork-card">
                <div className="artwork-card-img">
                    <div className={classNames("placeholder", {
                        "loaded": hasLoaded,
                    })}></div>
                    <div className={classNames("image", {
                        "loaded": hasLoaded,
                    })}>
                        <img src={hasLoaded ? artworkLink : ""} alt={this.artwork.title} />
                    </div>
                </div>
                <div className="artwork-card-footer">
                    <div className="title">{this.artwork.title}</div>
                    <div className="artist"><a href={linkToString(this.artwork.artistLink)}>{this.artwork.username}</a></div>
                </div>
            </div>
        )
    }
}

export default handleViewport(ArtworkCard, { rootMargin: "0px 0px 250px 0px" }, { disconnectOnLeave: true });
