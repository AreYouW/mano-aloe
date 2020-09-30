import {Message, messageFromJson} from "../models/message";
import {CountResponse, GalleryResponse, GamesResponse, MessageResponse, JWTResponse} from "../models/response";
import {Game, gameFromJson} from "../models/game";
import {Artwork, artworkFromJson} from "../models/artwork";

export default class ManoAloeService {
    private readonly baseURL: string;
    private readonly apiURL: string;

    constructor() {
        this.baseURL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:5000/';
        this.apiURL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:5000/api/';
    }

    private getCount(functionality: string): Promise<number> {
        return fetch(this.apiURL + functionality + '/count')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: CountResponse) => {
                return apiResponse.count;
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessage(messageID: number): Promise<Message> {
        return fetch(this.apiURL + 'messages/' + messageID)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return messageFromJson(apiResponse.messages[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getAllMessages(): Promise<Message[]> {
        return fetch(this.apiURL + 'messages')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessages(from: number, to: number): Promise<Message[]> {
        return fetch(this.apiURL + 'messages/range/' + from + '/' + to)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessageCount(): Promise<number> {
        return this.getCount('messages');
    }

    public getAllGames(): Promise<Game[]> {
        return fetch(this.apiURL + 'games')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: GamesResponse) => {
                return apiResponse.games.map(gameFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getGamesCount(): Promise<number> {
        return this.getCount('games');
    }

    public getGallery(): Promise<Artwork[]> {
        return fetch(this.apiURL + 'gallery')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: GalleryResponse) => {
                return apiResponse.gallery.map(artworkFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getGalleryCount(): Promise<number> {
        return this.getCount('gallery');
    }

    public async login(username: string, password: string): Promise<string> {
        return fetch(
            this.baseURL + "auth",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: JWTResponse) => {
                return apiResponse.access_token;
            })
            .catch((error: Error) => {
                throw error;
            })
    }
}
