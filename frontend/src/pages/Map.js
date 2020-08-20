import React from 'react';
import MapImg from '../assets/map.png'

export default function HomePage() {
  return (
    <div>
      <h2>MAP</h2>
      <img src={MapImg} alt="Map of World" />
    </div>
  );
}