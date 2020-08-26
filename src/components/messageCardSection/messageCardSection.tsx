import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import './messageCardLayout.css';
import { LanguageContext, LanguageContextValue } from "../languageSwitchSection/languageContext";

import './messageCardLayout.css';

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
      <LanguageContext.Consumer>
        {(value: LanguageContextValue) => {
          const { language } = value;
          return (
            <div className="messages-section">
              {this.data.map((message: Message, idx: number) =>
                <MessageCard key={message.messageID} message={message} cardStyleNum={idx%3} language={language}/>
              )}
            </div>
          );
        }}
      </LanguageContext.Consumer>
    )
  }
}
