import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFollowing, getFollowers } from '../../action/profileActions';
import { connect } from 'react-redux';

class ProfileHeader extends Component {

  onFollowingClick(handle){
    this.props.getFollowing(handle);
  }

  onFollowersClick(handle){
    this.props.getFollowers(handle);
  }

  render() {
    const { profile } = this.props;

    return (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info-profile mb-3 text-white">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={profile.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-center">{profile.handle}</h1>           
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
                <p className="display-5">
                  <Link to={`/profiles/following/${profile.handle}`} onClick={this.onFollowingClick.bind(this, profile.handle)} className="follow-link"><span>Following : {profile.following.length}</span></Link> 
                  <span className="divider">|</span> 
                  <Link to={`/profiles/followers/${profile.handle}`} onClick={this.onFollowersClick.bind(this, profile.handle)} className="follow-link"><span> Followers : {profile.followers.length}</span></Link>
                </p>            
              </div>
            </div>
            </div>
        </div>
      );
  }
}


export default connect(null, {
  getFollowing,
  getFollowers
})(ProfileHeader);