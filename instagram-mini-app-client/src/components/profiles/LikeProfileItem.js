import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LikeProfileItem extends Component{
  render(){
    const { postLike } = this.props;
    return(
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
          <img src={postLike.avatar} style={{width: '100px'}} alt=""
          className="rounded-circle"/>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{postLike.handle}</h3>
            <Link to={`/profiles/${postLike.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LikeProfileItem;