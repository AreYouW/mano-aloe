import React from "react";
import {Announcement} from "../../models/announcement";
//import "./announcementCard.css";
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
            <div>
                test
                {this.announcement}
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderAnnouncement());
    }
}
