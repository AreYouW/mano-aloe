import React from 'react';
import GallerySection from '../../components/gallery/gallerySection';
import {Artwork} from "../../models/artwork";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import './art.css'

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
        const cachedArtworks: Artwork[] | null = SessionService.getGallery();
        if (cachedArtworks && cachedArtworks.length) {
            this.setState({loading: false, artworks: cachedArtworks});
        } else {
            this.manoAloeService.getGallery()
                .then((artworks: Artwork[]) => {
                    SessionService.saveGallery(artworks);
                    this.setState({loading: false, artworks});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
    }

    renderGallerySection() {
        return (
            <GallerySection data={this.state.artworks}/>
        )
    }

    render() {
        return (
            <div className="wrapper-overlay">
                {this.state.loading ? 'Loading Placeholder' : this.renderGallerySection()}
            </div>
        )
    }
}
