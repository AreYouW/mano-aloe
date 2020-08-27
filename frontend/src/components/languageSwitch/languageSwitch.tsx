import React from 'react';
import {LanguageContext, LanguageContextValue} from "./languageContext";

import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';

export default function LanguageSwitchButton() {
    return (
        <LanguageContext.Consumer>
            {(value: LanguageContextValue) => 
                <IconButton
                    style={{width: 64, height: 64, padding: 0, color: '#ffffff'}}
                    aria-label='Language Switch' onClick={value.toggleLanguage}>
                    <TranslateIcon/>
                </IconButton>
            }
        </LanguageContext.Consumer>
    )
}
