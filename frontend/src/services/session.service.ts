import {Message} from "../models/message";

export default class SessionService {
    public static saveMessages(messages: Message[]): void {
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    public static getMessages(): Message[] {
        const messageString = localStorage.getItem('messages');
        if (messageString) {
            return JSON.parse(messageString) as Message[];
        }
        return [];
    }

    public static clearCache(): void {
        localStorage.clear();
    }
}