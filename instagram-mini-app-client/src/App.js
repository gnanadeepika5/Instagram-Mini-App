import React from 'react';
import video from './clouds-video.mp4';
import image from './instagram-background-image.jpg';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <video className='videoTag' autoPlay loop muted>
         <source src={video} type='video/mp4' />
      </video>
      {/* <img src={image} className='image' alt='image' /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
