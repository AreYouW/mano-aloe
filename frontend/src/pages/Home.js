import React from 'react';
import MessageCardSection from '../components/MessageCardSection'
import Container from '@material-ui/core/Container'
import data from '../assets/messages.json'

const wrapperOverlay = {
  marginTop:"-30vw",
  textAlign: "center"
}

export default function HomePage() {
  return (
    <div>
      <Container style={wrapperOverlay}>
        <MessageCardSection style={{}} data={data} />
      </Container>
    </div>
    
  );
}