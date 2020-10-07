import {Message, MessageJson, messageFromJson, messageToJson} from "../models/message";
import {Artwork, ArtworkJson, artworkFromJson, artworkToJson} from "../models/artwork";
import {Game, GameJson, gameFromJson, gameToJson} from "../models/game";
import {Archive, ArchiveJson, archiveFromJson, archiveToJson} from "../models/archive";
import DisplayedLanguage from "../models/language";

export default class SessionService {
    private static saveInCache<T>(key: string, object: T): void {
        SessionService.saveTimestamp();
        localStorage.setItem(key, JSON.stringify(object));
    }

    private static getFromCache<T>(key: string, validate = true): T | null {
        if (validate && SessionService.reloadRequired()) {
            SessionService.clearCache();
        }
        const objectString = localStorage.getItem(key);
        if (objectString) {
            return JSON.parse(objectString) as T;
        }
        return null;
    }

    private static saveTimestamp(): void {
        if (!this.getTimestamp()) {
            localStorage.setItem('saveDate', Date.now().toString());
        }
    }

    private static getTimestamp(): number | null {
        const savedTimestamp: string | null = localStorage.getItem('saveDate');
        return savedTimestamp ? parseInt(savedTimestamp) : null;
    }

    private static reloadRequired(): boolean {
        const savedTimestamp: number | null = SessionService.getTimestamp();
        if (savedTimestamp) {
            const currentTimestamp: number = Date.now();
            const msDiff = currentTimestamp - savedTimestamp;
            const cacheLifespan = process.env.REACT_APP_CACHE_LIFESPAN ? process.env.REACT_APP_CACHE_LIFESPAN : 0;
            if (msDiff < cacheLifespan) {
                return false
            }
        }
        return true;
    }

    public static saveMessages(messages: Message[]): void {
        let json = messages.map(messageToJson);
        SessionService.saveInCache<MessageJson[]>('messages', json);
    }

    public static getMessages(): Message[] | null {
        let messages = SessionService.getFromCache<MessageJson[]>('messages');
        return messages?.map(messageFromJson) ?? null;
    }

    public static saveGallery(gallery: Artwork[]): void {
        let json = gallery.map(artworkToJson);
        SessionService.saveInCache<ArtworkJson[]>('gallery', json);
    }

    public static getGallery(): Artwork[] | null {
        let artworks = SessionService.getFromCache<ArtworkJson[]>('gallery');
        return artworks?.map(artworkFromJson) ?? null;
    }

    public static saveGames(games: Game[]): void {
        let json = games.map(gameToJson);
        SessionService.saveInCache<GameJson[]>('games', json);
    }

    public static getGames(): Game[] | null {
        let games = SessionService.getFromCache<GameJson[]>('games');
        return games?.map(gameFromJson) ?? null;
    }

    public static saveLanguage(language: DisplayedLanguage): void {
        SessionService.saveInCache<DisplayedLanguage>('language', language);
    }

    public static getLanguage(): DisplayedLanguage | null {
        return SessionService.getFromCache<DisplayedLanguage>('language', false);
    }

    public static saveArchives(archives: Archive[], who: string): void {
        let json = archives.map(archiveToJson);
        SessionService.saveInCache<ArchiveJson[]>('archives' + who, json);
    }

    public static getArchives(who: string): Archive[] | null {
        let archives = SessionService.getFromCache<ArchiveJson[]>('archives' + who);
        return archives?.map(archiveFromJson) ?? null;
    }

    public static clearCache(): void {
        let languageInCache = this.getLanguage();
        localStorage.clear();
        if (languageInCache !== null) {
            this.saveLanguage(languageInCache);
        }
    }
}
