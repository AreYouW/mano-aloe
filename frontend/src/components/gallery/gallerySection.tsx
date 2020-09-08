import React from 'react';
import {Artwork} from '../../models/artwork';
import ArtworkCard from './artworkCard/artworkCard';
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import DisplayedLanguage from "../../models/language";

interface GallerySectionProps extends BaseSectionProps<Artwork> {
}

interface GallerySectionState extends BaseSectionState {
}

export default class GallerySection extends BaseSection<Artwork> {

    constructor(props: GallerySectionProps) {
        super(props);
    }

    renderCard(object: Artwork, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <ArtworkCard cardStyleNum={id % 3} key={object.artworkID} object={object} language={language}/>;
    }
}
