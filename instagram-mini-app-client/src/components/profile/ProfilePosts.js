import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostsByHandle } from '../../action/postActions';
import Spinner from '../common/LodingGif';
import ProfilePostItem from './ProfilePostItem';

class ProfilePosts extends Component{
  componentDidMount(){
    this.props.getPostsByHandle(this.props.profile.handle)
  }
  render(){
    const { profile } = this.props;
    const { posts, loading } = this.props.post;
    let profilePostsContent;

    if(posts === null || loading){
      profilePostsContent = <Spinner/>
    } else if(posts.length > 0){
        profilePostsContent = posts.map(post => <ProfilePostItem key={post._id} post={post}/>)
    } else{
      profilePostsContent = <h4 className="card-body"><strong>{profile.handle}</strong> doesn't have any posts yet.</h4>
    }

    return(
          <div className="card card-body mb-3">
            <div className="row">
              {profilePostsContent}
            </div>
          </div>
    )
  }
}

ProfilePosts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPostsByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
})

export default connect(mapStateToProps, { getPostsByHandle })(ProfilePosts);