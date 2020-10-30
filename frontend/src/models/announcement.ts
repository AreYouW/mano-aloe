export interface Announcement {
    announcementID: number;
    message: string;
}

export interface AnnouncementJson {
    announcementID: number;
    message: string;
}

export function announcementFromJson(json: AnnouncementJson): Announcement {
    const { announcementID, message } = json;
    return {
        announcementID,
        message
    }
}

export function announcementToJson(announcement: Announcement): AnnouncementJson {
    const { announcementID, message } = announcement;
    return {
        announcementID,
        message
    }
}
