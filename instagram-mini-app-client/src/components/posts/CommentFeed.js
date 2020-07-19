import React, { Component } from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

class CommentFeed extends Component{
  render(){
    const { comments, postId } = this.props;
    return comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={postId}></CommentItem>
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed;