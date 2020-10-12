import React from 'react';
import MessageCardSection from '../../components/messageSection/messageSection';
import ArchiveSection from '../../components/archiveSection/archiveSection';
import {Message} from "../../models/message";
import {toRegion} from "../../models/region";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import Spinner from "../../shared/components/spinner/spinner";
import Fade from "../../shared/animation/fade";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Announcement} from "../../models/announcement"
import './home.css';
import '../../shared/globalStyles/global.css'
import AnnouncementSection from "../../components/announcementSection/announcementSection"

export interface HomePageProps {

}

export interface HomePageState {
    loading: boolean;
    messages: Message[];
    announcements: Announcement[];
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
        announcements: [],
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
                        message.region = toRegion(message.region as string);
                    }
                    SessionService.saveMessages(messages);
                    this.setState({loading: false, messages});
                })
                .catch((error: Error) => {
                    console.error(error);
                    this.setState({loading: false});
                })
        }
        this.manoAloeService.getAllAnnouncements()
            .then((announcements: Announcement[]) => {
                this.setState({announcements});
            })
            .catch((error: Error) => {
                console.error(error);
            })
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
            <section id='anchor'>
                <div className="home-root">
                    <Fade mounted={this.state.loading} childComponent={<Spinner/>}/>
                    <ArchiveSection />
                    <div className="justify-center">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements}/>
                        </div>
                    </div>
                    {this.renderMessageCardSection()}
                </div>
            </section>
        )
    }
}
