import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import { Region } from "../../models/region";
import "./messageCardLayout.css"

interface MessageCardSectionProps {
  data: any
}

interface MessageCardSectionState {

}

interface MessageData {
  Native_message: string;
  JP_message_Deepl: string | null;
  Name: string | null;
  Country: Region | null; // TODO
}

export default class MessageCardSection extends React.Component<MessageCardSectionProps, MessageCardSectionState> {
  private data: MessageData[];

  constructor(props: MessageCardSectionProps) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="parent">
          {this.data.map((data: MessageData, idx: number) => {
              const message: Message = {
                orig_msg : data.Native_message,
                jp_msg: data.JP_message_Deepl,
                username: data.Name,
                region: data.Country
              }
              return (
                <div className="card-parent">
                  <MessageCard message={message} cardStyleNum={(idx % 3)} />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
