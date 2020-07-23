import React, { Component } from 'react';
import Profiles from '../profiles/Profiles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import { getUserProfileByHandle } from '../../action/profileActions';

class Dashboard extends Component{

  render(){
    const { loading } = this.props;
    let dashboardContent;

    if(loading){
      dashboardContent = <Spinner/>
    }else{
      dashboardContent= <Profiles/>
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