import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props; 

    // Hobbies List
    let hobbies;
    if((profile.hobbies[0] !== "") && (profile.hobbies[0] !== undefined) && (profile.hobbies[0] !== null)){
      hobbies = profile.hobbies.map((hobby, index) => (
        <p key={index} className="profile-block">      
          {hobby}
        </p>
      ));
    }

     //  Countries visited
     let countries; 
     if((profile.countries[0] !== "") && (profile.countries[0] !== undefined) && (profile.countries[0] !== null)){
       countries = profile.countries.map((country, index) => (
         <p key={index} className="profile-block">
           {country}
         </p>
       ));
     }
 
      // Favorite places
      let places; 
       if((profile.places[0] !== "") && (profile.places[0] !== undefined) && (profile.places[0] !== null)){
       places = profile.places.map((place, index) => (
         <p key={index} className="profile-block">
           {place}
         </p>
       ));
     }
   
     return (
       <div className="row">
         <div className="col-md-12">
           <div className="card card-body mb-3">
                {isEmpty(profile.bio) ? (<p className="hide">{profile.bio}</p>) : (<p>{profile.bio}</p>) }
                <hr className="charcoal"/>

                {!isEmpty(profile.location) ? (<p><span className="profile-icon"><i className="fas fa-map-marker-alt fa-fw"></i></span> {profile.location}</p>) : (<p className="hide"></p>)}

                {!isEmpty(profile.website) ? (<p><span className="profile-icon"><i className="fas fa-globe fa-fw"></i></span> <a target="_blank" href={`${profile.website}`}>{profile.website}</a></p>) : (<p className="hide"></p>)}

                {(profile.hobbies[0] !== "") && (profile.hobbies[0] !== undefined) && (profile.hobbies[0] !== 'null') ? (<div><span className="profile-icon"><i className="fas fa-heart fa-fw"></i></span> {hobbies}</div>) : (<div className="hide"></div>)}

                {(profile.places[0] !== "") && (profile.places[0] !== undefined) && (profile.places[0] !== null) ? (<div><br/><span className="profile-icon"><i className="fas fa-map-pin fa-fw"></i></span> {places}<br/></div>) : (<div className="hide"></div>)}

                {(profile.countries[0] !== "") && (profile.countries[0] !== undefined) && (profile.countries[0] !== null) ? (<div><br/><span className="profile-icon"><i className="fas fa-atlas fa-fw"></i></span> {countries}<br/></div>) : (<div className="hide"></div>)}
            </div>
          </div>
        </div>
    );
  }
}


ProfileAbout.propTypes = {
profile: PropTypes.object.isRequired
};

export default ProfileAbout;
