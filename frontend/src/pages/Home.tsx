import React from 'react';
import MessageCardSection from '../components/messageCardSection/messageCardSection';
import {Message} from "../models/message";
import ManoAloeService from "../controllers/mano-aloe.service";
import SessionService from "../services/session.service";
import './Home.css'

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
    loading: true,
    messages: []
  }

  componentDidMount() {
    this.getData();
  }

  private getData(): void {
    const cachedMessages: Message[] | null = SessionService.getMessages();
    if (cachedMessages && cachedMessages.length) {
      this.setState({loading: false, messages: cachedMessages});
    } else {
      this.manoAloeService.getAllMessages()
        .then((messages: Message[]) => {
          SessionService.saveMessages(messages);
          this.setState({loading: false, messages});
        })
        .catch((error: Error) => {
          console.error(error);
        })
    }
  }

  renderMessageCardSection() {
    return (
      <MessageCardSection data={this.state.messages}/>
    )
  }

  render() {
    return (
      <div className="wrapper-overlay">
        {this.state.loading ? 'Loading Placeholder' : this.renderMessageCardSection()} // TODO
      </div>
    )
  }
}