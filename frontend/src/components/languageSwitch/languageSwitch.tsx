import React from 'react';
import DisplayedLanguage from '../../models/language';
import {LanguageContext, LanguageContextValue} from "./languageContext";

export default function LanguageSwitchButton() {
    return (
        <LanguageContext.Consumer>
            {(value: LanguageContextValue) => {
                const {language, toggleLanguage} = value;
                return (
                    <div className="language-switch-button" onClick={toggleLanguage}>
                        {language === DisplayedLanguage.Original ? "EN" : "JP"}
                    </div>
                );
            }}
        </LanguageContext.Consumer>
    )
}
