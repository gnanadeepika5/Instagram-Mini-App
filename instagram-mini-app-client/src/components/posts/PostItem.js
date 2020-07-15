import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PostItem extends Component{
  render(){

    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3">
            <p>
            <Link to="/profile">
              <img className="rounded-circle d-none d-md-inline"
                src={post.avatar}
                style={{width: '80px'}}
                alt=""
              />
              </Link>
              <span className="post-handle">{post.handle}</span>
            </p>
          </div>
          <div className="col-md-11">
            
            <img src={post.imageOrVideo}/>
            
            <p className="lead">{post.text}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default PostItem;