import React from 'react';
import Header from './header';
import SetUpPaper from './paper';
import PopUp from './popup';
import './styles.css';

export default function App() {
  const canvasRef = React.useRef();
  const [width, setWidth] = React.useState(0);
  const [popup, setPop] = React.useState(undefined);

  React.useLayoutEffect(() => {

    window.addEventListener("puzzle-correct", (e:any) => {
      console.log(e.detail)
      setPop(e.detail)
    })
  })

  React.useEffect(() => {
    SetUpPaper(canvasRef.current);
    setWidth(canvasRef.current ? width : 0);
      
  }, []);

  return (
    <div className='container'>
      <Header />
      {popup != undefined && <PopUp detail={popup} />}
      {/* <button>test button</button> */}
      <div className='container form'>
        {/* <h1>Play Puzzle</h1> */}
        <canvas className='puzzle' ref={canvasRef}></canvas>
        <div className='contents'>
        </div>

        <div className='about'>about</div>
      </div>
    </div>
  );
}