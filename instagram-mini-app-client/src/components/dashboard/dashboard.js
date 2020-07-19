//componentDidMount() is a hook that gets invoked right after a React component has been mounted aka after the first render() lifecycle.
import React, {Component} from 'react';
import Posts from '..Posts/Posts';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import spinner from '..common/LoadingGif';
//import (getUserProfileByHnadle) from '../../action/profileActions';
class Dashboard extends Component {
  componentDidMount(){
    this.props.getUserProfileByHnadle(this.props.auth.user.handle);

  }
  render(){
    const {loading} = this.props;
    let dashboardContent;
    if(loading){
      dashboardContent =<spinner />
    }
    else{
      dashboardContent = <Posts />
    }
    return(

      <div className="page-content">
        <div className= "container">
          <div className = "row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}
const mapStateToProps = state =({
  loading: state.post.loading,
  auth: state.auth
})
export default connect(mapStateToProps, {getUserProfileByHandle})(Dashboard);