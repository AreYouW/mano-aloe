import { Region } from "./region";

export interface Message {
    messageID: number;
    orig_msg: string;
    jp_msg: string;
    region: Region;
    username: string;
}
