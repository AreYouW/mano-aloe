import {Region, toRegion} from "./region";

export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string|null;
    region: Region;
    username: string;
}

export interface MessageJson {
    messageID: number;
    orig_msg: string;
    tl_msg: string|null;
    region: string;
    username: string;
}

export function messageFromJson(json: MessageJson): Message {
    const { messageID, orig_msg, tl_msg, region, username } = json;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: toRegion(region),
        username,
    }
}

export function messageToJson(message: Message): MessageJson {
    const { messageID, orig_msg, tl_msg, region, username } = message;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: region as string,
        username,
    }
}
