import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import video from '../BackgroundVideo/plexus.mp4';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <video autoPlay loop muted 
            style={{
              position: "absolute", 
              width: "100%", 
              left: "50%", 
              top : "50%", 
              objectFit:"cover", 
              transform:"translate(-50%, -50%)", zIndex:"-1"
            }}
            >
              <source src={video} type="video/mp4" />
            </video>
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Instagram Mini</h1>
                <p className="lead"> Telegram your precious memories to world.</p>
                <p className="secondLead">Have world as your family</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;