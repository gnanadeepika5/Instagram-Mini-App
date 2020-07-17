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
import './App.css';
import store from './store';

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
          <Route exact path="/postForm" component={PostForm}></Route>
          <Footer />
        </div>
        </Router>
        </Provider>
    );
  }
}

export default App;