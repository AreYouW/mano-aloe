import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {Game} from "../../models/game";
import DisplayedLanguage from "../../models/language";
import React from "react";
import GameCard from "./gameCard/gameCard";
import "./gameSection.css";

interface GameSectionProps extends BaseSectionProps<Game> {

}

interface GameSectionState extends BaseSectionState {

}

export default class GameSection extends BaseSection<Game> {
    renderCard(object: Game, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return(
            <div key={id} className="game-card-container">
                <GameCard key={id} object={object} cardStyleNum={cardStyleNum} language={language}/>
            </div>
        );
    }
}
