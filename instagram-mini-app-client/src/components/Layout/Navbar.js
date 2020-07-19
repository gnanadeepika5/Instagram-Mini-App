import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import logo from '../../img/instagram-logo.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
        <Link className="navbar-brand" to="/">
        <img src="" width="30" height="30" class="d-inline-block align-top" alt=""/>
          Instagram
          </Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html"> 
            </a>
              </li>
            </ul> */}
            

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
               <Link className="nav-link" to="/postForm"><i className="fas fa-plus"></i></Link>              
              </li>
              <li className="nav-item">
               <Link className="nav-link" to="/dashboard"><i className="fas fa-home"></i></Link>              
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
               </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;