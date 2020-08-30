import BaseSection, {BaseSectionProps, BaseSectionState} from "../shared/baseSection/baseSection";
import {Game} from "../../models/game";
import DisplayedLanguage from "../../models/language";
import React from "react";
import GameCard from "./gameCard/gameCard";
import {LanguageContext, LanguageContextValue} from "../languageSwitch/languageContext";

interface GameSectionProps {
    data: Game[],
}

interface GameSectionState {

}

export default class GameSection extends React.Component<GameSectionProps, GameSectionState> {
    private data: Game[];

    constructor(props: GameSectionProps) {
        super(props);
        this.data = props.data;
    }

    render() {
        return (
            <LanguageContext.Consumer>
                {(value: LanguageContextValue) => {
                    const {language} = value;
                    return(
                        <div className="gallery-section">
                            {this.data.map((game: Game, idx: number) =>
                                <GameCard key={game.gameID} game={game}
                                          cardStyleNum={idx % 3} language={language} />
                            )}
                        </div>
                    );
                }}
            </LanguageContext.Consumer>
        )
    }

    // renderCard(object: Game, cardStyleNum: number, language: DisplayedLanguage): JSX.Element {
    //     return(
    //         <GameCard object={object} cardStyleNum={cardStyleNum} language={language}/>
    //     );
    // }
}
