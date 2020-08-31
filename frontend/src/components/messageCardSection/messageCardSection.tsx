import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import './messageCardLayout.css';
import {LanguageContext, LanguageContextValue} from "../languageSwitch/languageContext";

import './messageCardLayout.css';

interface MessageCardSectionProps {
    data: Message[]
}

interface MessageCardSectionState {
    data: Message[]
}

export default class MessageCardSection extends React.Component<MessageCardSectionProps, MessageCardSectionState> {

    constructor(props: MessageCardSectionProps) {
        super(props);
    }

    state: MessageCardSectionState = {
        data: this.props.data
    }

    static getDerivedStateFromProps(props: MessageCardSectionProps, state: MessageCardSectionState): MessageCardSectionState {
        return {
            data: props.data
        };
    }

    render() {
        return (
            <LanguageContext.Consumer>
                {(value: LanguageContextValue) => {
                    const {language} = value;
                    return (
                        <div className="messages-section">
                            {this.state.data.map((message: Message, idx: number) =>
                                <MessageCard key={message.messageID} message={message} cardStyleNum={idx % 3}
                                             language={language}/>
                            )}
                        </div>
                    );
                }}
            </LanguageContext.Consumer>
        )
    }
}
