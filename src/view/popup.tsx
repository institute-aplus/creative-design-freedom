import React from 'react';

export default function PopUp() {
  
  const [show, setShow] = React.useState(false);

  return (
    <div className='popup' style={ {display: show ? 'block' : 'hidden'}}>
      <div className='btn close' onClick={()=> setShow(!show)}>x</div>
      <div className='overview'>
        <img src=""></img>
        <a>This is a template for popup</a>
      </div>
    </div>
  )
}