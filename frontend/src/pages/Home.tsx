import React from 'react'
import Container from '@material-ui/core/Container'
import MessageCardSection from '../components/messageCardSection/messageCardSection'
import {Message} from "../models/message";
import ManoAloeService from "../controllers/mano-aloe.service";

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
    messages: []
  }

  componentDidMount() {
    this.getData();
  }

  private getData(): void {
    this.manoAloeService.getAllMessages()
        .then((messages: Message[]) => {
          console.log('message:');
          console.log(messages);
          this.setState({loading: false, messages});
        })
  }

  renderMessageCardSection() {
    return (
        <MessageCardSection data={this.state.messages}/>
    )
  }

  render() {
    return (
        <Container className="wrapper-overlay">
          {this.state.loading ? 'Loading Placeholder' : this.renderMessageCardSection()} // TODO
        </Container>
    )
  }
}