import React from 'react';

export default function PopUp({ detail } : {detail : any}) {
  
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(true);
  }, [detail])

  return (
    <>
    {show && <div className='popup' style={ {display: show ? 'block' : 'hidden'}}>
      <div className='btn close' onClick={()=> setShow(!show)}>x</div>
      <div className='overview'>
        <img src=""></img>
        <a>This is a template for popup {detail}</a>
      </div>
    </div>}
    </>

  )
}