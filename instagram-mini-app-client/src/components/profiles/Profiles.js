import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import ProfileItem from './ProfileItems';
import {
    getProfiles
} from '../../action/profileActions';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        const { auth } = this.props;
        const { userProfile } = this.props.auth;
        let profileItems;

        if (profiles == null || loading) {
            profileItems = <Spinner />;
        } else if (profiles.length > 1) {
            profileItems = profiles.map(profile => (
                (profile.handle !== auth.user.handle ) ? (<ProfileItem key={profile._id} profile={profile} />) : (null)
            ));
        } else {
            profileItems = <h3 display-5 text-center>No Profiles found.</h3>;
        }

        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
                            <h1 className="display-5 text-center">Connect with the world.</h1>
                            <p className="lead text-center">
                                Suggestions for you:
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Profiles);