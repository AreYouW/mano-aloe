import {Country} from "./country";

export interface MessageData {
    Native_message: string;
    JP_message_Deepl: string | null;
    Name: string | null;
    Country: Country | null; // TODO
}