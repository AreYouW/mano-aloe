import React from 'react';
import DisplayedLanguage from '../../models/language';

export interface LanguageContextValue {
    language: DisplayedLanguage;
    toggleLanguage: () => void;
}

export const LanguageContext = React.createContext<LanguageContextValue>({
    language: DisplayedLanguage.Original,
    toggleLanguage: () => {
    }
});
