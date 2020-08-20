import React from 'react';
import MessageCardSection from '../components/MessageCardSection'
import data from '../assets/messages.json'

export default function HomePage() {
  return (
    <div>
      <h2>HOME</h2>
      <MessageCardSection data={data} />
    </div>
  );
}