import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import logo from '../../img/instagram-logo.svg';
import {connect} from 'react-redux';
import {logoutUser} from '../../action/authActions';
import PropTypes from 'prop-types';

class Navbar extends Component {
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
        <Link className="nav-link" to="/searchForm">
        <i class="fa fa-search" aria-hidden="true"></i> 
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/postForm"><i className="fas fa-plus"></i></Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard"><i className="fas fa-home"></i></Link>              
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles"><i class="fa fa-users" aria-hidden="true"></i>
                {" "}
                Profiles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles"><i class="fa fa-comments" aria-hidden="true"></i>
                {" "}
                Messages
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
        <Link className="navbar-brand" to="/"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i>
          Instagram
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);