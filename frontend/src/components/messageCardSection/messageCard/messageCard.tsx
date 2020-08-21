import React from "react";
import {Card, CardActionArea, CardActions, CardContent, IconButton, Typography} from "@material-ui/core";
import JapanFlagImg from "../../../assets/ICON_RESIZED-Flag_of_Japan.svg.png";
import LanguageIcon from "@material-ui/icons/Language";
import styles from "./styles.module.css";
import {Message} from "../../../models/message";

interface MessageCardProps {
    message: Message;
}

interface MessageCardState {
    currentLanguage: string;
}

export default class MessageCard extends React.Component<MessageCardProps, MessageCardState> {
    private readonly message: Message;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.message;
    }

    state: MessageCardState = {
        currentLanguage: 'original'
    }

    private getCurrentLanguage(): string {
        return this.state.currentLanguage;
    }

    private setCurrentLanguage(language: string): void {
        this.setState({currentLanguage: language});
    }

    private renderMessage(language: string, message: Message): JSX.Element {
        // console.log(props);
        switch(language) {
            case 'jp':
                return <Typography variant="h5" component="h2">{message.jp_msg}</Typography>
            case 'original':
                return <Typography variant="h5" component="h2">{message.orig_msg}</Typography>
            default:
                return <Typography variant="h5" component="h2">{message.jp_msg}</Typography>
        }
    }

    render() {
        const handleCardClick = () => {
            console.log(this.message)
        }
        const messageText = this.renderMessage(this.getCurrentLanguage(), this.message);

        return (
            <Card className={styles.root}>
                <CardActions>
                    <IconButton onClick={() => this.setCurrentLanguage("jp")}>
                        <img src={JapanFlagImg} alt="Japan Flag" />
                    </IconButton>
                    <IconButton onClick={() => this.setCurrentLanguage("original")}>
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
                            {this.message.region}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}