export type ExternalLink = URL | null;

export function stringToLink(link: string): ExternalLink {
    let url;
    try {
        url = new URL(link);
    } catch {
        url = null;
    }

    return url;
}

export function linkToString(link: ExternalLink): string {
    return link?.toString() ?? "";
}
