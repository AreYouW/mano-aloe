import React from "react";
import {Card, CardActionArea, CardActions, CardContent, IconButton, Typography} from "@material-ui/core";
import JapanFlagImg from "../../../assets/ICON_RESIZED-Flag_of_Japan.svg.png";
import LanguageIcon from "@material-ui/icons/Language";
import {Message} from "../../../models/message";
import LazyLoad from "react-lazyload";

import CSS from 'csstype';

const rootStyles: CSS.Properties = {
  backgroundImage: "url('../../../assets/card2.png')",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#fd418d"
};
const cardStyles: CSS.Properties = {
    height: "650px"
}

enum DisplayedLanguage {
    Original,
    Japanese,
}

interface MessageCardProps {
    message: Message;
}

interface MessageCardState {
    currentLanguage: DisplayedLanguage;
}

export default class MessageCard extends React.Component<MessageCardProps, MessageCardState> {
    private readonly message: Message;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.message;
    }

    state: MessageCardState = {
        currentLanguage: DisplayedLanguage.Original
    }

    private getCurrentLanguage(): DisplayedLanguage {
        return this.state.currentLanguage;
    }

    private setCurrentLanguage(language: DisplayedLanguage): void {
        this.setState({currentLanguage: language});
    }

    private renderMessage(language: DisplayedLanguage, message: Message): JSX.Element {
        if (language === DisplayedLanguage.Japanese) {
            return <Typography variant="h5" component="h2">{message.tl_msg}</Typography>
        }
        return <Typography variant="h5" component="h2">{message.orig_msg}</Typography>
    }

    render() {
        const handleCardClick = () => {
            console.log(this.message)
        }
        const messageText = this.renderMessage(this.getCurrentLanguage(), this.message);

        return (
            <LazyLoad once height={650} offset={4000}>
                <Card style={rootStyles}>
                    <CardActions>
                        <IconButton onClick={() => this.setCurrentLanguage(DisplayedLanguage.Japanese)}>
                            <img src={JapanFlagImg} alt="Japan Flag" />
                        </IconButton>
                        <IconButton onClick={() => this.setCurrentLanguage(DisplayedLanguage.Original)}>
                            <LanguageIcon fontSize="large" />
                        </IconButton>
                    </CardActions>
                    <CardActionArea onClick={handleCardClick}>
                        <CardContent>
                            { messageText }
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.message.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.message.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </LazyLoad>
        )
    }
}
