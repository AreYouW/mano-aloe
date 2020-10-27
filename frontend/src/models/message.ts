import {Country, toCountry} from "./country";

export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string | null;
    country: Country;
    username: string;
}

export interface MessageJson {
    messageID: number;
    orig_msg: string;
    tl_msg: string | null;
    country: string;
    username: string;
}

export function messageFromJson(json: MessageJson): Message {
    const { messageID, orig_msg, tl_msg, country, username } = json;
    return {
        messageID,
        orig_msg,
        tl_msg,
        country: toCountry(country),
        username,
    }
}

export function messageToJson(message: Message): MessageJson {
    const { messageID, orig_msg, tl_msg, country, username } = message;
    return {
        messageID,
        orig_msg,
        tl_msg,
        country: country as string,
        username,
    }
}
