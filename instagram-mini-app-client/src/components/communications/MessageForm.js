import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';

class MessageForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      msg:'',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e){
    e.preventDefault();

    const { user } = this.props.auth;
    const { }

    const newConversation = {
      msg: this.state.msg,
    };
    this.props.addMessage(newConversation, this.props.history);
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
                  <TextAreaFieldGroup name="msg"
                                      type="text"
                                      placeholder="Add a message to send"
                                      value={this.state.msg}
                                      onChange={this.onChange.bind(this)}
                                      error={errors.msg}
                  />
                </div>
            <button type="submit" className="btn btn-info">
                  Send
                </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    );
  }


}