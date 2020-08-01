import React, { Component } from 'react';
import Posts from '../posts/Posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import { getUserProfileByHandle, getCurrentProfile, deleteAccount } from '../../action/profileActions';
import { Link } from 'react-router-dom';
import bgImage from '../../img/insta-bg-image.jpg';

var sectionStyle = {
  backgroundImage: `url(${bgImage})`
}
class Dashboard extends Component{

  componentDidMount(){
    this.props.getUserProfileByHandle(this.props.auth.user.handle);
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render(){
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { loading } = this.props;

    let dashboardContent;

    if(profile === null || loading){
      dashboardContent = <Spinner/>
    } else {
      // dashboardContent= <Posts/>

      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <div style={{ marginBottom: '60px' }} />
          </div>
          <div>
            <br></br>
            <Posts/>
          </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/editProfile" className="btn btn-lg btn-info">
              Create or Edit Profile
            </Link>
          </div>
          <div>
            <Posts/>
          </div>
          </div>
        );
      }
    }
    return(
      
      <div className="page-content">
        <div className="container">
      
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
      
      
    );
  }
}


Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getUserProfileByHandle, getCurrentProfile, deleteAccount }) (Dashboard);