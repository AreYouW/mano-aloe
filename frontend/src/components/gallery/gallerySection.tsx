import React from 'react';
import {Artwork} from '../../models/artwork';
import ArtworkCard from './artworkCard/artworkCard';
import './gallerySection.css';

interface GallerySectionProps {
    data: Artwork[],
}

interface GallerySectionState {

}

export default class GallerySection extends React.Component<GallerySectionProps, GallerySectionState> {
    private data: Artwork[];

    constructor(props: GallerySectionProps) {
        super(props);
        this.data = props.data;
    }

    render() {
        return (
            <div className="gallery-section">
                {this.data.map((artwork: Artwork) =>
                    <ArtworkCard key={artwork.artworkID} artwork={artwork} />
                )}
            </div>
        )
    }
}
