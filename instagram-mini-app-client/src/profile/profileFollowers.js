import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/common/LodingGif';
import ProfileFollowersItem from './profileFollowersItem';
import isEmpty from '../utils/isEmpty';

class ProfileFollowers extends Component{
  render(){
    const { followers, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileFollowersItems;

    if(loading || followers === null){
      profileFollowersItems = <Spinner/>
    } else if(followers.length > 0){
        profileFollowersItems = followers.map(eachFollower => <ProfileFollowersItem key={eachFollower._id} eachFollower={eachFollower}/>)
    } else{
        profileFollowersItems = <h3>{user.handle}, you do not have any followers yet...</h3>
    }

    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
            <h3 className="text-center">
                {!isEmpty(followers) && (<div>{user.handle}'s followers...</div>)}
              </h3>
              {profileFollowersItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileFollowers.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  auth: state.auth
})

export default connect(mapStateToProps, null) (ProfileFollowers);
