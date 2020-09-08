import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import DisplayedLanguage from "../../models/language";

interface MessageSectionProps extends BaseSectionProps<Message> {

}

interface MessageSectionState extends BaseSectionState {

}


export default class MessageSection extends BaseSection<Message> {

    constructor(props: MessageSectionProps) {
        super(props);
    }

    renderCard(object: Message, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <MessageCard key={object.messageID} object={object} cardStyleNum={id % 3} language={language}/>;
    }
}
