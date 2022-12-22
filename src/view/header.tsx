import React from 'react';
import './styles.css';
export default function Header() {
  const [position, setPosition] = React.useState<String>('');

  return (
    <div className="header">
      <div
        className='btn'
        onClick={() => {
          console.log('???');
          setPosition('puzzle');
        }}
      >
        Puzzle
      </div>
      <div
        className='btn'
        onClick={() => {
          console.log('???');
          setPosition('Concept');
        }}
      >
        Concept
      </div>
      <div
        className='btn'
        onClick={() => {
          console.log('???');
          setPosition('About');
        }}
      >
        About Us
      </div>
    </div>
  );
}
