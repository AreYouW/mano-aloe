import { Region } from "./region";

export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    country: Region;
    username: string;
}
