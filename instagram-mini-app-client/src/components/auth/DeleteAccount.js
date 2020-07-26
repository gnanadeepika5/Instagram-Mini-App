import React, { Component } from 'react';
import { deleteAccount } from '../../action/profileActions';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';

class DeleteAccount extends Component {

    componentWillMount() {
        this.props.deleteAccount();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
                            <h2>YAY!!! We are so glad you decided to stay back!</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DeleteAccount.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {
    deleteAccount
})(DeleteAccount);