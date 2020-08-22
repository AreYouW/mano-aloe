import {Message} from "../models/message";

export default class SessionService {
    public static saveMessages(messages: Message[]): void {
        const messagesString = messages.map((message: Message) => {
            return JSON.stringify(message);
        })
        localStorage.setItem('messages', JSON.stringify(messagesString));
    }

    public static getMessages(): Message[] {
        const messageString = localStorage.getItem('messages');
        if (messageString) {
            const messagesString: string[] = JSON.parse(messageString);
            const messages: Message[] = messagesString.map((message: string) => {
                return JSON.parse(message) as Message;
            })
            return messages;
        }
        return [];
    }

    public static clearCache(): void {
        localStorage.clear();
    }
}