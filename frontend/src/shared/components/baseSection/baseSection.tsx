import React from 'react';
import AnnouncementCard from '../../../components/announcementSection/announcementCard';
import {Announcement} from "../../../models/announcement";
import {LanguageContext, LanguageContextValue} from "../../../components/languageSwitch/languageContext";
import DisplayedLanguage from "../../../models/language";
import {CardStyleLength} from "../../../shared/components/baseCard/baseCard";
import './baseSection.css'

export interface BaseSectionProps<T> {
    data: T[];
    customSectionStyle?: string;
}

export interface BaseSectionState {

}

export default abstract class BaseSection<T> extends React.Component<BaseSectionProps<T>, BaseSectionState> {
    protected constructor(props: BaseSectionProps<T>) {
        super(props);
    }

    abstract renderCard(object: T, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element

    render(): JSX.Element {
        const sectionStyle: string = this.props.customSectionStyle ? this.props.customSectionStyle : "base-section";
        return (
            <LanguageContext.Consumer>
                {(value: LanguageContextValue) => {
                    const {language} = value;
                    if (!this.props.data.length) {
                        const emptyAnnouncemment: Announcement = { announcementID: 0, message: "Nothing here! Check back later!" };
                        return <AnnouncementCard object={emptyAnnouncemment} cardStyleNum={0} language={language} />;
                    } else {
                        return (
                            <div className={sectionStyle}>
                                {this.props.data.map((object: T, idx: number) => {
                                        return this.renderCard(object, idx % CardStyleLength, language, idx)
                                    }
                                )}
                            </div>
                        );
                    }
                }}
            </LanguageContext.Consumer>
        );
    }
}
