import React from 'react';
import GallerySection from '../../components/gallery/gallerySection';
import {Artwork} from "../../models/artwork";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import '../../shared/globalStyles/global.css'

import AnnouncementCard from '../../components/announcementSection/announcementCard';
import {Announcement} from "../../models/announcement";
import DisplayedLanguage from "../../models/language";

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
        if (!this.state.artworks.length) {
            const emptyAnnouncemment: Announcement = { announcementID: 0, message: "Nothing here! Check back later!" };
            return <AnnouncementCard object={emptyAnnouncemment} cardStyleNum={0} language={DisplayedLanguage.Original} />;
        }
        else return (
            <GallerySection data={this.state.artworks}/>
        )
    }

    render() {
        return (
            <section id='anchor'>
                <div className="separator"/>
                <div className="wrapper-overlay">
                    {this.state.loading ? 'Loading...' : this.renderGallerySection()}
                </div>
            </section>
        )
    }
}
