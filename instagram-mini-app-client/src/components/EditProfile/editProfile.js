import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link , withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { editProfile, getCurrentProfile } from '../../action/profileActions';
import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      website: '',
      location: '',
      hobbies: '',
      countries: '',
      places: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
    
      // Bring arrays back to CSV
      const hobbiesCSV = profile.hobbies.join(',');
      const countriesCSV = profile.countries.join(',');
      const placesCSV = profile.places.join(',');

      // If profile field doesnt exist, make empty string
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.hobbies = !isEmpty(profile.hobbies) ? profile.hobbies  : '';
      profile.countries = !isEmpty(profile.countries) ? profile.countries  : '';
      profile.places = !isEmpty(profile.places) ? profile.places  : '';

      // Set component fields state
      this.setState({
        bio: profile.bio,
        website: profile.website,
        location: profile.location,
        hobbies: hobbiesCSV,
        countries: countriesCSV,
        places: placesCSV,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
  
    const profileData = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
      hobbies: this.state.hobbies,
      countries: this.state.countries,
      places: this.state.places,
    };

    this.props.editProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { profile } = this.props.profile;
    return (
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <Link className="btn btn-light" to={`/profiles/${profile.handle}`}>
                Go Back
              </Link>
              <h1 className="text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Bio"
                  name="bio"
                  type="text"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell other wanderers something about yourself."
                /> 
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  type="text"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or another social profile."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city &amp; state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Hobbies"
                  name="hobbies"
                  type="text"
                  value={this.state.hobbies}
                  onChange={this.onChange}
                  error={errors.hobbies}
                  info="Please use comma separated values, eg.
                    photography,sewing,swimming"
                />
                <TextFieldGroup
                  placeholder="Countries you've visited"
                  name="countries"
                  type="text"
                  value={this.state.countries}
                  onChange={this.onChange}
                  error={errors.countries}
                  info="Which countries have you visited? Please use comma separated values, eg.
                  Switzerland,Spain,France"
                />
                <TextFieldGroup
                  placeholder="Your favorite places"
                  name="places"
                  type="text"
                  value={this.state.places}
                  onChange={this.onChange}
                  error={errors.places}
                  info="What are you favorite places? Please use comma separated values, eg.
                  Berlin,Paris,London"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);