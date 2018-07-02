import React from 'react';
import PropTypes from 'prop-types';

import User from 'src/components/User/User';

// import {  } from './styles';

import SchemaContainer from './SchemaContainer';

const defaultUser = {
    id: null,
    first: '',
    last: '',
    password: '',
    nick: '',
    email: '',
    bio: '',
    editor: false
};

class UserDetail extends React.Component {

    //TODO: Redux
    //TODO: Validation!
    saveUser = (user) => {
        this.props.upsertUser({ variables: { user } })
            .then(({ data }) => {
                console.log('upsert success!', data);
            }).catch((error) => {
                console.error('there was an error sending the upsertUser', error);
            });
    }

    render() {
        const user = !this.props.queryId ? defaultUser : this.props.userQuery.user;
        const loading = !this.props.queryId ? false : this.props.userQuery.loading;
        const isNew = !this.props.queryId;

        return (
            <User
                user={user}
                loading={loading}
                isNew={isNew}
                saveUser={this.saveUser} />
        );
    }
}

UserDetail.propTypes = {
    registering: PropTypes.bool,
    queryId: PropTypes.string
}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(UserDetail)
