import { Country } from "./country";

export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    country: Country;
    username: string;
}
