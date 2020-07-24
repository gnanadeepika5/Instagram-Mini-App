import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileFollowingItem extends Component{
  render(){
    const { eachFollowing } = this.props;
    
    return(
      <div>
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2">
            <img src={eachFollowing.avatar} alt="" className="rounded-circle avatar-140" />
          </div>
          <div className="col-xs-6 col-sm-7 col-md-8 col-lg-10 col-xl-10">
            <h3>{eachFollowing.handle}</h3>
            <Link to={`/profiles/${eachFollowing.handle}`} className="btn btn-info">
              View Profile
            </Link>          
          </div>         
        </div>
      </div>
      </div>
    )
  }
};

ProfileFollowingItem.propTypes = {
  eachFollowing: PropTypes.object.isRequired
}

export default connect() (ProfileFollowingItem);