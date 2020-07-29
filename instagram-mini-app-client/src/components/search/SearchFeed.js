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

    if(loading){
      searchPostContent = <spinner/>;
    } else if(posts && posts.length > 0 && posts[0]){
      var posts2 = posts[0];
      searchPostContent = 
        posts2.map(post => <PostItem key={post._id} post={post}/>);

      
    }
    // else{
    //   searchPostContent = "<p>Please enter valid word to search</p>";
    // }
        return (
        <div className="feed">
        <div className="container">
          {/* <h4>please enter valid word to search else, no results will show up.Thank you!!!</h4>  */}
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
