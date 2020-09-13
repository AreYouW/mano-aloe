import React from 'react';
import {LanguageContext, LanguageContextValue} from "./languageContext";
import DisplayedLanguage from '../../models/language';

import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';

var buttonStyleActive = {width: 64, height: 64, padding: 0, color: '#ffffff'}
var buttonStyleInactive = {width: 64, height: 64, padding: 0, color: '#ffffff', opacity: '40%'}

export default function LanguageSwitchButton() {
    return (
        <LanguageContext.Consumer>
            {(value: LanguageContextValue) =>
                <IconButton
                        style={
                            value.language == DisplayedLanguage.Original ?
                                buttonStyleInactive : buttonStyleActive
                        }
                        aria-label='Language Switch'
                        onClick={value.toggleLanguage}>
                    <TranslateIcon/>
                </IconButton>
            }
        </LanguageContext.Consumer>
    )
}
