import React from 'react';
import { Spinner } from 'react-bootstrap';
import spinner from './spinner.gif';

export default function LoadingGif(){
  return(
    <div>
      <Spinner animation="grow"  variant="info" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
      {/* <img src={spinner}
           style={{width: '250px', margin: 'auto', display: 'block'}}
           alt="Loading..."
      /> */}
    </div>
  )
} 
