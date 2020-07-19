import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPost } from '../../action/postActions';
import isEmpty from '../../utils/isEmpty';

class Post extends Component {  
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render(){
    const { post, loading } = this.props.post;
    //console.log(post._id);
    let postContent;
    if(post === null || loading || isEmpty(post)){
      postContent = <Spinner/>
    }
    else{
      postContent = (
        <div>
          <PostItem post={post} showActions={false}></PostItem>
          <CommentForm postId={post._id}></CommentForm>
          <CommentFeed postId={post._id} comments={post.comments}></CommentFeed>
        </div>
      );      
    }
    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <Link to="/dashboard" className="btn btn-light mb-3">
                Back <i className="fas fa-home"></i>
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post
})
export default connect(mapStateToProps, { getPost })(Post);