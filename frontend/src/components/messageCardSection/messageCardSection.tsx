import React from 'react';
import { Grid } from '@material-ui/core' // MessageCardSection
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import "./messageCardLayout.css"

interface MessageCardSectionProps {
  data: any
}

interface MessageCardSectionState {

}

export default class MessageCardSection extends React.Component<MessageCardSectionProps, MessageCardSectionState> {
  private data: any;

  constructor(props: MessageCardSectionProps) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="parent">
          {this.data.map((data: { Native_message: any; JP_message_Deepl: any; Name: any; Country: any; }, idx: number) => {
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