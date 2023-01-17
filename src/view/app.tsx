import React from 'react';
import Header from './header';
import SetUpPaper from './paper';
import symbol1 from 'Assets/jiyuaki.jpg';
import './styles.css';

export default function App() {
  const canvasRef = React.useRef();
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    SetUpPaper(canvasRef.current);
    setWidth(canvasRef.current ? width : 0);
  })

  return (
    <div className='container'>
      <Header />
      {/* <button>test button</button> */}
      <div className='container form'>
        <h1>Play Puzzle</h1>
        <canvas className='puzzle' ref={canvasRef}></canvas>
        <div className='contents'>
          <h1>{width}</h1>
        </div>

        <div className='about'>about</div>
      </div>
    </div>
  );
}