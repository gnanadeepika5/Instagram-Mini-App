import React, { Component } from 'react';
import classnames from 'classnames';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../action/messageActions';
import MessageFeed  from './MessageFeed';
class messageForm extends Component {

  constructor()
  {
    super();
    this.state ={
      msg:'',
      errors:{}
      
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
   componentDidMount() {
     
     
   }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }
  onSubmit(e){
    e.preventDefault();
    const {user} = this.props.auth;
    const toUserId = this.props.match.params.id;
    const newMessage ={
      msg:this.state.msg,
      handle: user.handle,
      avatar:user.avatar
    };

    this.props.addMessage(toUserId, newMessage, this.props.history);
    this.setState({msg: ''});
  
  }

  render(){
    const {errors} = this.state;
    const toUserId = this.props.match.params.id;

    this.state.toUserId = {toUserId};

    return(
      <div>
       
        <div className="mb-3">
          <div className="card card-info">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" 
                       name="msg" 
                       className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name,
                      })} 
                       placeholder="Send a message" 
                       value={this.state.msg}
                       onChange={this.onChange}
                  />
                  
                  
                </div>
                <button type="submit" className="btn btn-info">
                  Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="card card-info">
            <div className="card-body">
              <MessageFeed toUserId={toUserId}></MessageFeed>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

messageForm.propTypes ={
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  toUserId: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired
}

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect( mapStateToProps, { addMessage }) (messageForm);