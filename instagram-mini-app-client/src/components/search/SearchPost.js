import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import isEmpty from '../../utils/isEmpty';
import SearchFeed from './SearchFeed';
import SearchItem from './SearchItem';
import PostItem from '../posts/PostItem';

class SearchPost extends Component {
  render(){
    console.log("props are is "+this.props);
    console.dir(this.props);
    const {posts, loading } = this.props.post;

    // console.dir(this.props.post);
    let searchpostContent;
        if(posts === null || loading){
          searchpostContent = <Spinner/>
        }
        else if(posts.length > 0){
            searchpostContent = posts.map(post => <PostItem key={post._id} post={post}/>);
          } 
      
    return(
      <div className="feed">
        <div className="container">
        <h4>Here are your search result for posts <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </h4>
          {searchpostContent}
        </div>
      </div>
      
    );
  }
}
SearchPost.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  posts: state.posts
})

export default connect(mapStateToProps) (SearchPost);