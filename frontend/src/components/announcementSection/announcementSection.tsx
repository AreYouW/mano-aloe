import React from 'react';
import AnnouncementCard from "./announcementCard";
import {Announcement} from "../../models/announcement";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import DisplayedLanguage from "../../models/language";
import ManoAloeService from "../../controllers/mano-aloe.service"

interface AnnouncementSectionProps {
    
}

interface AnnouncementSectionState {
    announcements: Announcement[];
}

export default class AnnouncementSection extends React.Component<AnnouncementSectionProps, AnnouncementSectionState> {
    private manoAloeService: ManoAloeService;

    constructor(props: AnnouncementSectionProps) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    private getData(): void {
        this.manoAloeService.getAllAnnouncements()
            .then((announcements: Announcement[]) => {
                this.setState({announcements});
            })
    }

    componentDidMount() {
        this.getData();
        //console.log(this.manoAloeService.getAllAnnouncements());
        console.log(this.state);
    }

    render(): JSX.Element {
        return (
            <div>
            </div>
        );
    }

    renderCard(object: Announcement, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <AnnouncementCard key={object.announcementID} object={object} cardStyleNum={id % 3} language={language}/>;
    }
}
