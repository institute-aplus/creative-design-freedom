import React from 'react';
import Header from './header';
export default function App() {
  const [show, setShow] = React.useState<Boolean> ();
  return (
    <div className='container'>
    <Header />
    {/* <button>test button</button> */}
    <canvas className='puzzle'></canvas>
    <div className='contents'>
      contents
    </div>
    <div className='about'>about</div>
    </div>
  );
}