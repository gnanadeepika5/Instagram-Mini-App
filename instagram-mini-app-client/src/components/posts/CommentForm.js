import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../action/postActions';

class CommentForm extends Component {
  constructor(){
    super();
    this.state = {
      text:'',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  
  onSubmit(e){
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;
    
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      handle: user.handle
    };

    this.props.addComment(postId, newComment);
    this.setState({text: ''});
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const { errors } = this.state;

    return(
      <div>
        <div className="mb-3">
          <div className="card card-info">
            <div className="card-body">
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <TextAreaFieldGroup name="text"
                                      type="text"
                                      placeholder="Add a comment"
                                      value={this.state.text}
                                      onChange={this.onChange.bind(this)}
                                      error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-info">
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, { addComment }) (CommentForm);