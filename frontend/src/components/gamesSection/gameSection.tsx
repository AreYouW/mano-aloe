import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {Game} from "../../models/game";
import DisplayedLanguage from "../../models/language";
import React from "react";
import GameCard from "./gameCard/gameCard";

interface GameSectionProps extends BaseSectionProps<Game> {

}

interface GameSectionState extends BaseSectionState {

}

export default class GameSection extends BaseSection<Game> {
    renderCard(object: Game, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return(
            <GameCard key={id} object={object} cardStyleNum={cardStyleNum} language={language}/>
        );
    }
}
