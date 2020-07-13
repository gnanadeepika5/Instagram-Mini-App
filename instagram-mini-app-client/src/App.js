import React, {Component} from 'react';
//import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
         {/* <BackgroundVideo /> */}
          <Navbar />
          <Landing />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
        </Router>
    )
  }
}

export default App;