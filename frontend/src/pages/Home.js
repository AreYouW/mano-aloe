import React from 'react'

import Container from '@material-ui/core/Container'
import MessageCardSection from '../components/MessageCardSection'
import data from '../assets/messages.json'
import './Home.css'

export default function HomePage() {
  return (
    <Container style={{marginTop:"-25vw", textAlign: "center" }}>
      <MessageCardSection data={data} />
    </Container>
  )
}