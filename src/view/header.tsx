import React from 'react';
import './styles.css';
export default function Header() {
  // const [position, setPosition] = React.useState<String>('');

  return (
    <div className="header">
      <div
        className="btn logo"
        onClick={() => {
          location.href = 'https://github.com/cy-moi/creative-design-freedom';
        }}
      >
        JIYUU
      </div>
      <div className="btns">
        <div
          className="btn"
          onClick={() => {
            location.reload();
            // console.log('???');
            // setPosition('puzzle');
          }}
        >
          Play Puzzle
        </div>
        <div
          className="btn"
          onClick={() => {
            // console.log('???');
            // setPosition('Concept');
            document
              .getElementById('concept')
              .scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Concepts
        </div>
        <div
          className="btn"
          onClick={() => {
            // console.log('???');
            // setPosition('About');
            document
              .getElementById('aboutus')
              .scrollIntoView({ behavior: 'smooth' });
          }}
        >
          About Us
        </div>
      </div>
    </div>
  );
}
