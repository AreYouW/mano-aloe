import {Message} from "./message";
import {Game} from "./game";
import {Artwork} from "./artwork";

interface BaseResponse {
    status: string;
}

export interface MessageResponse extends BaseResponse {
    messages: Message[];
}

export interface GamesResponse extends BaseResponse {
    games: Game[];
}

export interface GalleryResponse extends BaseResponse {
    gallery: Artwork[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}



