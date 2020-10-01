import React from 'react';
import MessageCardSection from '../../components/messageCardSection/messageCardSection';
import {Message} from "../../models/message";
import {toCountry} from "../../models/country";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import './home.css';
import Spinner from "../../shared/components/spinner/spinner";
import Fade from "../../shared/animation/fade";

import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import IconButton from '@material-ui/core/IconButton';

export interface HomePageProps {

}

export interface HomePageState {
    loading: boolean;
    messages: Message[];
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    state: HomePageState = {
        loading: false,
        messages: [],
    }

    componentDidMount() {
        this.getData();
    }

    private getData(): void {
        const cachedMessages: Message[] | null = SessionService.getMessages();
        if (cachedMessages && cachedMessages.length) {
            this.setState({messages: cachedMessages});
        } else {
            this.setState({loading: true});
            this.manoAloeService.getAllMessages()
                .then((messages: Message[]) => {
                    for (let message of messages) {
                        message.country = toCountry(message.country as string);
                    }
                    SessionService.saveMessages(messages);
                    this.setState({loading: false, messages});
                })
                .catch((error: Error) => {
                    console.error(error);
                    this.setState({loading: false});
                })
        }
    }

    renderMessageCardSection() {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.loading ? <div/> : <MessageCardSection data={this.state.messages}/>}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="home-root">
                <Fade mounted={this.state.loading} childComponent={<Spinner/>}/>
                {this.renderMessageCardSection()}
            </div>
        )
    }
}
