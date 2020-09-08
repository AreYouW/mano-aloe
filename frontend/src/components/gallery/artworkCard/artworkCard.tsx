import React from 'react';
import classNames from 'classnames';
import { Artwork } from '../../../models/artwork';
import './artworkCard.css';
import { linkToString } from '../../../models/url';
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface ArtworkCardProps extends BaseCardProps<Artwork> {
}

interface ArtworkCardState extends BaseCardState {
    loadingState: ImageLoadingState,
}

export default class ArtworkCard extends BaseCard<Artwork, ArtworkCardProps, ArtworkCardState> {
    private readonly artwork: Artwork;
    private imageElement: HTMLImageElement;

    constructor(props: ArtworkCardProps) {
        super(props);
        this.artwork = props.object;
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    state: ArtworkCardState = {
        loadingState: ImageLoadingState.NotLoaded,
        inViewport: false,
        currentLanguage: this.props.language,
        globalLanguage: this.props.language,
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.state.inViewport && this.state.loadingState === ImageLoadingState.NotLoaded) {
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

    renderArtwork(): JSX.Element {
        const hasLoaded = this.state.loadingState === ImageLoadingState.Loaded;
        const artworkLink = linkToString(this.artwork.artworkLink);
        const backgroundImage = hasLoaded ? `url("${artworkLink}")` : "none";

        return (
            <div className="artwork-card">
                <div className="artwork-card-img">
                    <div className="effects" style={{backgroundImage}}/>
                    <div className={classNames("placeholder", {
                        "loaded": hasLoaded,
                    })}/>
                    <div className={classNames("image", {
                        "loaded": hasLoaded,
                    })}>
                        <img src={hasLoaded ? artworkLink : ""} className="game-thumbnail" alt={this.artwork.title} />
                    </div>
                </div>
                <div className="artwork-card-footer">
                    <div className="title">{this.artwork.title}</div>
                    <div className="artist"><a href={linkToString(this.artwork.artistLink)}>{this.artwork.username}</a></div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderArtwork());
    }
}

// export default handleViewport(ArtworkCard, { rootMargin: "0px 0px 250px 0px" }, { disconnectOnLeave: true });
