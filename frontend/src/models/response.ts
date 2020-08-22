import {Message} from "./message";

export interface MessageResponse {
    status: string;
    messages: Message[];
}

export interface CountResponse {
    status: string;
    count: number;
}