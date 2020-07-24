import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/common/LodingGif';
import ProfileFollowingItem from './profileFollowingItem';
import isEmpty from '../utils/isEmpty';

class ProfileFollowing extends Component{
  render(){
    const { following, loading } = this.props.profile;
    const { user } = this.props.auth;

    let profileFollowingItems;

    if( loading || following === null){
      profileFollowingItems = <Spinner/>
    } else if(following.length > 0){
        profileFollowingItems = following.map(eachFollowing => <ProfileFollowingItem key={eachFollowing._id} eachFollowing={eachFollowing}/>)
    } else{
        profileFollowingItems = <h3> {user.handle}, you are not following anyone yet...</h3>
    }

    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
            <h3 className="text-center">
                {!isEmpty(following) && (<div>{user.handle}, wanderers you are following...</div>)}
              </h3>
              {profileFollowingItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileFollowing.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  auth: state.auth
})

export default connect(mapStateToProps, null) (ProfileFollowing);