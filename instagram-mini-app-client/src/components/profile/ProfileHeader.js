import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFollowing, getFollowers } from '../../action/profileActions';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

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
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">
                  {profile.status}{' '}
                  {isEmpty(profile.company) ? null : (
                    <span>at {profile.company}</span>
                  )}
                </p>
                {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
                <p>
                  {isEmpty(profile.website) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.website}
                      target="_blank"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.twitter}
                      target="_blank"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.facebook}
                      target="_blank"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.linkedin) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.linkedin}
                      target="_blank"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a
                      className="text-white p-2"
                      href={profile.social.youtube}
                      target="_blank"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}

                </p>
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