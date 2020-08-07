import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser} from '../../action/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

 class Login extends Component {
  constructor(){
    super();
    this.state = {
      email:'',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,        
    };

    this.props.loginUser(user);    
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }


  render() {
    const { errors } = this.state;
    return (
      <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">
            Sign in to your Instagram account
          </p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextFieldGroup
              placeholder='Email Address'
              name='email' 
              type='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              />
              </div>
              <div className="form-group">
              <TextFieldGroup
              placeholder='Password'
              name='password' 
              type='password'
              error={errors.password}
              value={this.state.password}
              onChange={this.onChange}             
              />
            </div>
            <input type="submit" className="btn btn-secondary btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);