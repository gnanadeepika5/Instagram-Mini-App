import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
//import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PostForm from './components/posts/PostForm';
import Dashboard from './components/dashboard/dashboard';
import Post from './components/posts/Post';
//import LikesProfiles from './components/profiles/LikesProfiles';
import './App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './action/dispatchTypes';
import { logoutUser } from './action/authActions';

//Check for token
if (localStorage.jwtToken){
//Set auth header with token
setAuthToken(localStorage.jwtToken);
//decode token
const decoded = jwt_decode(localStorage.jwtToken);
//write user data to redux store
store.dispatch({
  type: SET_CURRENT_USER,
  payload: decoded
  });
//check for expired token
const currentTime = Date.now() / 1000;
if (decoded.exp < currentTime) {
  store.dispatch(logoutUser());

  window.location.href='/login';
}
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          {/* <BackgroundVideo /> */}
          <Navbar />
          <Route exact path ="/" component = {Landing} />
          <Route exact path ="/register" component={Register} />
          <Route exact path ="/login" component={Login} />
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path="/postForm" component={PostForm}></Route>
          <Route exact path="/post/id/:id" component={Post}></Route>
          {/* <Route exact path='/likesProfiles/:id' component={LikesProfiles}/> */}
          <Footer />
        </div>
        </Router>
        </Provider>
    );
  }
}

export default App;