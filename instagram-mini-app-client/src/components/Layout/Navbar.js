import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import logo from '../../img/instagram-logo.svg';
import {connect} from 'react-redux';
import {logoutUser} from '../../action/authActions';
import PropTypes from 'prop-types';
import profileReducer from '../../reducers/profileReducer';
import { getProfileByHandle } from '../../action/profileActions';
import NavbarCss from './Navbar.css';
import NotFound from '../../components/profile/notFound';

class Navbar extends Component {
  constructor(){
    super();
    this.state={
      handle: '',
      errors: {}
    }
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  onSearchClick(handle){
    this.props.getProfileByHandle(handle);
  }
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
       <li className="nav-item">
         
         <div class="search">
        <input className="search-bar"
              name="handle"
               type="text" 
               placeholder="Search by user handle"
               value={this.state.handle}
               onChange={this.onChange.bind(this)}
               errors={this.state.errors}
        />
        {console.log(this.state.handle)}
          <Link className="nav-link search-icon" to={`/profile/${this.state.handle}`} onClick={this.onSearchClick.bind(this, this.state.handle)}>
          <button type="submit" class="searchButton">Go
            </button>
          </Link>  
        </div>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/searchForm">
        <i class="fa fa-search" aria-hidden="true" title="Search at posts"></i> 
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/postForm"><i className="fas fa-plus"
           title="Add a post"
          ></i></Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard"><i className="fas fa-home"
          title="Homepage"
          ></i></Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles"><i class="fa fa-users" aria-hidden="true" title="Profiles"></i>
                {" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles"><i class="fa fa-comments" aria-hidden="true" title="Communications"></i>
                {" "}
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a gravatar connected to your email to display an image" />
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i>
          Instagram Mini
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired 
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser, getProfileByHandle})(Navbar);