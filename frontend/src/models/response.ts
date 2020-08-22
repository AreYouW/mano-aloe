import {Message} from "./message";

interface BaseResponse {
    status: string;
}

export interface MessageResponse extends BaseResponse {
    messages: Message[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}