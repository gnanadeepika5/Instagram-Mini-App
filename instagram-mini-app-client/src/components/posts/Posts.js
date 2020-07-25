import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../action/postActions';
import Spinner from '../common/LodingGif';
import PostItem from './PostItem';

class Posts extends Component {
  componentDidMount(){
    this.props.getPosts();
  }

  render() {

    const {posts, loading } = this.props.post;
    console.log("posts is "+this.props.post);
    console.dir(this.props.post);
    let postContent;
    
    if(posts === null || loading){
      postContent = <Spinner/>
    } else if(posts.length > 0){
      postContent = posts.map(post => <PostItem key={post._id} post={post}/>);
    } 

    return (
      <div className="feed">
        <div className="container">
        <h4>Click on the <i className="fas fa-plus fa-fw"></i> on the navbar to add a post!
        </h4>
          {postContent}
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);