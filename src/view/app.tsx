import React from 'react';
import Header from './header';
import SetUpPaper from './paper';
import './styles.css';

export default function App() {
  const [show, setShow] = React.useState<Boolean> ();
  const canvasRef = React.useRef();

  React.useLayoutEffect(() => {
    SetUpPaper(canvasRef.current);
  })

  return (
    <div className='container'>
      <Header />
      {/* <button>test button</button> */}
      <div className='container form'>
        <canvas className='puzzle' ref={canvasRef}></canvas>
        <div className='contents'>
          contents
        </div>
        <div className='about'>about</div>
      </div>
    </div>
  );
}