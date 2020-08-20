import React from 'react'

import Container from '@material-ui/core/Container'
import MessageCardSection from '../components/MessageCardSection'
import data from '../assets/messages.json'

export default function HomePage() {
  return (
    <div>
      <Container className="wrapperOverlay">
        <MessageCardSection data={data} />
      </Container>
    </div>
  )
}