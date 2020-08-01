import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

//import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import LikesProfiles from './components/profiles/LikesProfiles';

import Navbar from './components/Layout/Navbar';

import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PostForm from './components/posts/PostForm';
import Post from './components/posts/Post';
import './App.css';
import CreateProfile from './components/createProfile/CreateProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import editProfile from './components/EditProfile/editProfile';
import profileFollowing from './components/profile/profileFollowing';
import profileFollowers from './components/profile/profileFollowers';
import AddExperience from './components/addCredentials/AddExperience';
import AddEducation from './components/addCredentials/AddEducation';
import NotFound from './components/profile/notFound';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './action/dispatchTypes';
import { logoutUser } from './action/authActions';
import dashboard from './components/dashboard/dashboard';
import messageForm from './components/communications/messageForm';
import MessageFeed from './components/communications/MessageFeed';
import searchForm from './components/search/SearchForm';

//Check for token
if (localStorage.jwtToken){
//Decode token
const decoded = jwt_decode(localStorage.jwtToken);

//Check for expired token
const currentTime = Date.now() / 1000;
if (decoded.exp < currentTime) {
  //Logout user
  store.dispatch(logoutUser());
  //Redirect user login
  window.location.href='/login';
}

//Set auth header
setAuthToken(localStorage.jwtToken);

//Dispatch call
store.dispatch({
  type: SET_CURRENT_USER,
  payload: decoded,
});
}

class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
      <Router>
      {/* <div class="basic-root-page"> */}
        <div className="App">
        
             <Navbar/>
         
          <Route exact path ="/" component = {Landing} />
          
          <div className="container">
            <Route exact path ="/register" component={Register} />
            <Route exact path ="/login" component={Login} />
            <Switch>
            <Route exact path="/profiles" component={Profiles} />
            </Switch>
            <Switch>
            <Route exact path='/profile/:handle' component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/searchForm" component={searchForm} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/createProfile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/EditProfile" component={editProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/postForm" component={PostForm} />
            </Switch>
            
              <Route exact path="/post/id/:id" component={Post}></Route>
            <Switch>
              <Route exact path='/profile/following/:handle' component={profileFollowing} />
            </Switch>
            <Switch>
              <Route exact path='/profile/followers/:handle' component={profileFollowers} />
            </Switch>
            <PrivateRoute exact path='/notFound' component={NotFound} />
            <Switch>
              <PrivateRoute exact path='/likesProfiles/:id' component={LikesProfiles}/>
            </Switch>
            <Switch>
            <PrivateRoute exact path='/messageForm/:id' component={messageForm}/>
            </Switch>
            <Switch>
            <Route exact path='/MessageFeed/:id' component={MessageFeed}></Route>
            </Switch>
            </div>
          <Footer />
        </div>
        {/* </div> */}
        </Router>
        </Provider>
    );
  }
}

export default App;