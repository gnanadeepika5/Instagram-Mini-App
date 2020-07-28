import React, { Component } from 'react';
import PostItem from '../posts/PostItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../common/LodingGif';


class SearchFeed extends Component{
  render(){
    const {posts, loading } = this.props.search;
    console.log("came to search feed");
    console.dir(this.props);
    let searchPostContent;
    searchPostContent = <spinner/>;
   // console.log("came here +searchPostContent");
   console.log("came here "+posts);
    if(posts) {
      console.log("came here searchpostcontent "+searchPostContent);
    }
    if(loading){
      searchPostContent = <spinner/>;
    } else if(posts && posts.length > 0){
      console.log("came here2 "+ posts[0]);
      console.dir(posts[0]);
      var posts2 = posts[0];
      searchPostContent = 
        posts2.map(post => <PostItem key={post._id} post={post}/>);
        //console.log("came here "+searchPostContent");
      
      
    }
        return (
        <div className="feed">
        <div className="container">
          {searchPostContent}
        
        </div>
      </div>
        )
  }
}
SearchFeed.propTypes = {
  auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  search: state.search,
  errors: state.errors
})

export default connect(mapStateToProps)(SearchFeed);
