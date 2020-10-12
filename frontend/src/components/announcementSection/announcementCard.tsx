import React from "react";
import {Announcement} from "../../models/announcement";
import CardStyle1 from "../../assets/cards/card1.svg";
import CardStyle2 from "../../assets/cards/card2.png";
import CardStyle3 from "../../assets/cards/card3.png";
import DisplayedLanguage from "../../models/language";
//import "./messageCard.css";
import BaseCard, {BaseCardProps, BaseCardState} from "../../shared/components/baseCard/baseCard";

interface AnnouncementCardProps extends BaseCardProps<Announcement>{
}

interface AnnouncementCardState extends BaseCardState{
}

export default class AnnouncementCard extends BaseCard<Announcement, AnnouncementCardProps, AnnouncementCardState> {
    private readonly announcement: Announcement;

    constructor(props: AnnouncementCardProps) {
        super(props);
        this.announcement = props.object;
    }

    renderAnnouncement() {
        return (
            <div className="notice-content">
                {this.announcement.message}
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderAnnouncement());
    }
}
