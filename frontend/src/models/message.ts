import { Region } from "./region";

export interface Message {
    messageID?: number;
    orig_msg: string;
    jp_msg: string | null;
    region: Region | null;
    username: string | null;
}
