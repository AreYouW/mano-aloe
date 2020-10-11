import React from 'react';
import AnnouncementCard from "./announcementCard";
import {Announcement} from "../../models/announcement";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import DisplayedLanguage from "../../models/language";

interface AnnouncementSectionProps extends BaseSectionProps<Announcement> {

}

interface AnnouncementSectionState extends BaseSectionState {

}


export default class AnnouncementSection extends BaseSection<Announcement> {

    constructor(props: AnnouncementSectionProps) {
        super(props);
    }

    renderCard(object: Announcement, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <AnnouncementCard key={object.announcementID} object={object} cardStyleNum={id % 3} language={language}/>;
    }
}
