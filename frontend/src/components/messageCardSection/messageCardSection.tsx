import React from 'react';
import { Grid } from '@material-ui/core' // MessageCardSection
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";

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
        <Grid container justify="center" spacing={3}>
          {this.data.map((message: Message, idx: number) => {
            return (
                <Grid key={'Message' + idx} item xs={4}>
                  <MessageCard message={message} cardStyleNum={idx%3}/>
                </Grid>
            )
          })}
        </Grid>
    )
  }
}
