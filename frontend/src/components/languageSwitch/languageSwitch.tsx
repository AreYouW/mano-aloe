import React from 'react';
import {LanguageContext, LanguageContextValue} from "./languageContext";

import TranslateIcon from '@material-ui/icons/Translate';

export default function LanguageSwitchButton() {
    return (
        <LanguageContext.Consumer>
            {(value: LanguageContextValue) => 
                <TranslateIcon onClick={value.toggleLanguage}/>
            }
        </LanguageContext.Consumer>
    )
}
