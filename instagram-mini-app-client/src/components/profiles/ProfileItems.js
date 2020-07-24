import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';
import {
  connect
} from 'react-redux';
import {
  followUserByHandle
} from '../../action/profileActions';
import {
  unFollowUserByHandle
} from '../../action/profileActions';

class ProfileItems extends Component {

  onFollowCLick(e) {
    console.log('follow......');
    console.log(this.props.profile.handle);
    this.props.followUserByHandle(this.props.profile.handle);
}

onUnFollowClick(e) {
    console.log('Unfollow......')
    console.log(this.props.profile.handle);
    this.props.unFollowUserByHandle(this.props.profile.handle);
}

render() {
    const {
        profile
    } = this.props;

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2">
                    <img src={profile.avatar} className="rounded-circle avatar-150" />
                </div>
                <div className="col-xs-6 col-sm-7 col-md-8 col-lg-10 col-xl-10">
                    <h3>{profile.handle}</h3>
                    <p>
                        {isEmpty(profile.bio) ? (<span></span>) : (<span>{profile.bio}</span>)}
                    </p>
                    <p>{profile.user.name}</p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                        View Profile. Get to know about the world..!
                    </Link>
                    <p>
                        <span>
                            <button className="btn btn-light mr-5" onClick={this.onFollowCLick.bind(this)}><i className="fas fa-user-plus"></i></button>
                        </span>
                        <span>
                            <button className="btn btn-light mr-2" onClick={this.onUnFollowClick.bind(this)}><i className="fas fa-user-minus"></i></button>
                        </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileItems.propTypes = {
    profile: PropTypes.object.isRequired,
    followUserByHandle: PropTypes.func.isRequired,
    unFollowUserByHandle: PropTypes.func.isRequired
};

export default connect( null, { followUserByHandle, unFollowUserByHandle })(ProfileItems);