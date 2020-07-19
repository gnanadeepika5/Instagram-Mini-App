import React, { Component } from 'react';
import Posts from '../posts/Posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import { getUserProfileByHandle } from '../../action/profileActions';

class Dashboard extends Component{

  componentDidMount(){
    this.props.getUserProfileByHandle(this.props.auth.user.handle);
  }

  render(){
    const { loading } = this.props;
    let dashboardContent;

    if(loading){
      dashboardContent = <Spinner/>
    }else{
      dashboardContent= <Posts/>
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
    )
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  auth: state.auth
})

export default connect(mapStateToProps, { getUserProfileByHandle }) (Dashboard);