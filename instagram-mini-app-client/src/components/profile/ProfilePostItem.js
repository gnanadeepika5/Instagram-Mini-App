import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { getPost } from '../../action/postActions';

class ProfilePostItem extends Component{

  onPostClick(id){
    this.props.getPost(id);
  } 
  render(){
    const { post } = this.props;
    let profilePostContent;

    if(post.isImageOrVideo === 'Image'){
      // the html tag should be an image tag
      profilePostContent = 
        <img src={post.imageOrVideoLink} alt=""/>
    }
    if(post.isImageOrVideo === 'Video'){
      // the html tag should be a ReactPlayer
      profilePostContent = <ReactPlayer 
                      controls 
                      url={post.imageOrVideoLink}/>
    }
    return(

          <div className=".col-4 .col-sm-12 col-md-4 .col-lg-4 .col-xl-4">
            <div className="profile-post">
              <Link to={`/post/id/${post._id}`} className="text-dark" onClick={this.onPostClick.bind(this, post._id)}>
                {profilePostContent}
              </Link>
            </div>
          </div>
    )
  }
}

ProfilePostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { getPost }) (ProfilePostItem);