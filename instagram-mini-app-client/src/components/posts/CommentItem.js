import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../action/postActions';

class CommentItem extends Component{

  onDeleteClick(postId, commentId){
    this.props.deleteComment(postId, commentId);
  }

  render(){
    const { postId, comment, auth } = this.props;
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profiles/${comment.handle}`}>
              <img className="rounded-circle d-none d-md-inline comment-avatar"
                    src={comment.avatar}
                    alt="">
              </img>
              <span className="text-left text-dark comment-handle">{comment.handle}</span>
            </Link>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}
            {comment.user === auth.user.id ? (
              <button onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                      type="button"
                      className="btn btn-danger ml-3 delete-cmt"
              >
                <i className="fas fa-times"></i>
              </button>
            ): null}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment }) (CommentItem);