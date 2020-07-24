import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileFollowersItem extends Component{
  render(){
    const { eachFollower } = this.props;
    
    return(
      <div>
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2">
            <img src={eachFollower.avatar} alt="" className="rounded-circle avatar-140" />
          </div>
          <div className="col-xs-6 col-sm-7 col-md-8 col-lg-10 col-xl-10">
            <h3>{eachFollower.handle}</h3>
            <Link to={`/profiles/${eachFollower.handle}`} className="btn btn-info">
              View Profile
            </Link>          
            {/* <p>
            <span> <button className="btn btn-light mr-3" onClick={this.onFollowClick.bind(this)}><i className="fas fa-user-plus"></i></button></span>  
            <span><button className="btn btn-light mr-1" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button></span>      
            </p> */}
          </div>         
        </div>
      </div>
      </div>
    )
  }
};

ProfileFollowersItem.propTypes = {
  eachFollower: PropTypes.object.isRequired
}

export default connect() (ProfileFollowersItem);