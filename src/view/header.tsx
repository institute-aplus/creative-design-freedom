import React from 'react';
import './styles.css';
export default function Header() {
  const [position, setPosition] = React.useState<String>('');

  return (
    <div className="header">
      <div className="btn logo">JIYUU</div>
      <div className="btns">
        <div
          className="btn"
          onClick={() => {
            console.log('???');
            setPosition('puzzle');
          }}
        >
          Play Puzzle
        </div>
        <div
          className="btn"
          onClick={() => {
            console.log('???');
            setPosition('Concept');
          }}
        >
          Concept
        </div>
        <div
          className="btn"
          onClick={() => {
            console.log('???');
            setPosition('About');
          }}
        >
          About Us
        </div>
      </div>
    </div>
  );
}
