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
import ScrollDownIcon from '../../assets/miscellaneous/arrow-down.png';

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
                <div className="separator">
                    <AnchorLink offset='100' href='#video-anchor'>
                        <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button"/>
                    </AnchorLink>
                </div>
                <div className="video-container">
                    <section id='video-anchor'/>
                    <iframe title="Mano Aloe Fanmade Video" className="video-tag"
                            src="https://www.youtube-nocookie.com/embed/1QdGzRGSuOM?rel=0" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
                <div className="separator">
                    <AnchorLink offset='100' href='#message-anchor'>
                        <img className="anchor-link" src={ScrollDownIcon} alt="scroll down button"/>
                    </AnchorLink>
                </div>
                <div className="notice-center">
                    <div className="notice-container">
                        <section id='message-anchor'/>
                        <a href="https://manoaloe.jetri.co">
                            <div className="notice-content">Check out dragonjet's site too!</div>
                        </a>
                    </div>
                </div>
                    <div className="wrapper-overlay">
                        <MessageCardSection data={this.state.messages}/>
                    </div>
                <div className="notice-center">
                    <div className="notice-container">
                        <div className="notice-content">
                            <p>Those were all the messages we managed to collect, but there were many more sent your
                                way! Please check <a
                                    href="https://twitter.com/hashtag/%E3%82%A2%E3%83%AD%E3%82%A8Worldwide?src=hashtag">#アロエWorldwide</a> and <a
                                    href="https://twitter.com/hashtag/Global%E3%82%A2%E3%83%AD%E3%82%A8?src=hashtag">#Globalアロエ</a> on
                                Twitter, or visit <a href="https://manoaloe.jetri.co/">dragonjet</a>'s site!</p>
                            <p>これがすべての取集したメッセージですが、他にもたくさん送りましたよ！<a
                                href="https://twitter.com/hashtag/%E3%82%A2%E3%83%AD%E3%82%A8Worldwide?src=hashtag">#アロエWorldwide</a> と <a
                                href="https://twitter.com/hashtag/Global%E3%82%A2%E3%83%AD%E3%82%A8?src=hashtag">#Globalアロエ</a> をツイッターでチェックしてくださいね！
                                そして<a href="https://manoaloe.jetri.co/">dragonjet</a>のサイトでもメッセージが収集してあります！</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="home-root">
                {/*<Fade mounted={this.state.loading} childComponent={<Spinner/>}/>*/}
                {this.state.loading ? <div/> : this.renderMessageCardSection()}
            </div>
        )
    }
}
