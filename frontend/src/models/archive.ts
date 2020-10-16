export interface Archive {
    archiveID: number;
    archiveURL: string;
}

export interface ArchiveJson {
    archiveID: number;
    archiveURL: string;
}

export function archiveFromJson(json: ArchiveJson): Archive {
    const { archiveID, archiveURL } = json;
    return {
        archiveID,
        archiveURL: lengthenArchiveURL(archiveURL),
    };
}

export function archiveToJson(archive: Archive): ArchiveJson {
    const { archiveID, archiveURL } = archive;
    return {
        archiveID,
        archiveURL: shortenArchiveURL(archiveURL),
    };
}

/**
 * Turn a full invidious link into the 11-character ID
 * @param archiveURL
 */
function shortenArchiveURL(archiveURL: string): string {
    return archiveURL.substring(39, 50);
}

/**
 * Turn a shortened 11-character ID into a full invidious link
 * @param archiveURL 
 */
function lengthenArchiveURL(archiveURL: string): string {
    return "https://www.youtube-nocookie.com/embed/" + archiveURL;
}
