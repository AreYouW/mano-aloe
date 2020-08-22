import {Message} from "./message";

export interface ApiResponse {
    status: string;
    messages: Message[];
}