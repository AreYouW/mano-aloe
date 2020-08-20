import React from 'react'

import Container from '@material-ui/core/Container'
import MessageCardSection from '../components/messageCardSection/messageCardSection'
import data from '../assets/messages.json'

export default class HomePage extends React.Component {
  render() {
    return (
        <div>
          <Container className="wrapperOverlay">
            <MessageCardSection data={data} />
          </Container>
        </div>
    )
  }
}