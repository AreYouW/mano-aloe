import {MessageJson} from "./message";
import {GameJson} from "./game";
import {ArtworkJson} from "./artwork";

interface BaseResponse {
    status: string;
}

export interface MessageResponse extends BaseResponse {
    messages: MessageJson[];
}

export interface GamesResponse extends BaseResponse {
    games: GameJson[];
}

export interface GalleryResponse extends BaseResponse {
    gallery: ArtworkJson[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}

export interface JWTResponse extends BaseResponse {
    access_token: string;
}