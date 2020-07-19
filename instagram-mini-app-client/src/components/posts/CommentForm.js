import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class CommentForm extends Component {
  constructor(){
    super();
    this.state = {
      text: '',
      errors: {}
  };
}
onSubmit(e){
  e.preventDefault();

  const newComment={
    text: this.state.text
  }
  this.props.addPost(newPost, this.props.history);
}
onChange(e) {
  this.setState({[e.target.name]: e.target.value});
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
export default CommentForm;