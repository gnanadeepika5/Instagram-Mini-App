import React from 'react';
import spinner from './spinner.gif';

export default function LoadingGif(){
  return(
    <div>
      <img src={spinner}
           style={{width: '250px', margin: 'auto', display: 'block'}}
           alt="Loading..."
      />
    </div>
  )
} 
