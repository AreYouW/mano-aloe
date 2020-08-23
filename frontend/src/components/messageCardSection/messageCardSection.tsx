import React from 'react';
import { Grid } from '@material-ui/core' // MessageCardSection
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import './messageCardLayout.css'

interface MessageCardSectionProps {
  data: Message[]
}

interface MessageCardSectionState {

}

export default class MessageCardSection extends React.Component<MessageCardSectionProps, MessageCardSectionState> {
  private data: Message[];

  constructor(props: MessageCardSectionProps) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="parent">
          {this.data.map((message: Message, idx: number) => {
          return (
          <MessageCard message={message} cardStyleNum={idx%3}/>
          )
          })}
        </div>
      </div>
    )
  }
}
