import {Message} from "../models/message";
import {ApiResponse} from "../models/response";
const fetch = require('node-fetch');

export default class ManoAloeService {
    private readonly apiURL: string;

    constructor() {
        this.apiURL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'localhost:6969';
    }

    private api<T>(url: string): Promise<T> {
        return fetch(url)
            .then((response: { ok: any; statusText: string | undefined; json: () => any; }) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then((data: T) => data);
            })

    }

    public getMessage(messageID: number): void {
         fetch(this.apiURL + 'messages/' + messageID)
            .then((res: { json: () => any; }) => res.json())
            .then((json: any) => console.log(json));
    }

    async getAllMessages(): Promise<Message[]> {
        console.log(this.apiURL);
       return fetch(this.apiURL + 'messages', {
           mode: 'cors',
           method: 'GET',
           headers: {
               'Access-Control-Allow-Origin': '*'
           }
       })
            .then((res: { json: () => any; }) => {
                console.log(res);
                return res.json();
            })
            .then((apiResponse: ApiResponse) => {
                return apiResponse.messages;
            })
           .catch((error: Error) => {
               console.error(error);
           })
    }

    async getMessages(from: number, to: number): Promise<Message[]> {
        const response = await fetch(this.apiURL + 'messages/range/' + from + '/' + to)
        const apiResponse: ApiResponse = await response.json()
            .catch((error: any) => {
                console.error(error);
            })
        return apiResponse.messages;
    }
}