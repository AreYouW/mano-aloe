import React from 'react';
import MessageCardSection from '../components/messageCardSection/messageCardSection';
import {Message} from "../models/message";
import {toCountry} from "../models/country";
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
          for (let message of messages) {
            message.country = toCountry(message.country as string);
          }
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
			<div>
				<div className="community-message-card">
					<h1 className="community-message-header">A Community Message for Aloe</h1>
					<div className="community-message-body">
						<p>
							Dear Aloe, in celebration of your return, we've organized a community full of amazing fans to show our support! On behalf of everybody from the M.A.S.S. community, welcome back!
						</p>
					</div>
				</div>
				<div className="separator"/>
				<div className="video-container">
					<iframe title="Mano Aloe Fanmade Video" className="video-tag" src="https://www.youtube-nocookie.com/embed/1QdGzRGSuOM?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
				</div>
				<div className="separator"/>
				<div className="wrapper-overlay">
					<MessageCardSection data={this.state.messages}/>
				</div>
			</div>
    )
  }

  render() {
    return (
      <div className="home-root">
        {this.state.loading ? 'Loading Placeholder' : this.renderMessageCardSection()} // TODO
      </div>
    )
  }
}
