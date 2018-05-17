import React from 'react';
import update from 'immutability-helper';
import removeByKey from 'utils/removeByKey'
import PropTypes from 'prop-types';
import { set } from 'lodash';

// import { StyledSaveButton, StyledInput, StyledTextarea } from './styles';

import FA from 'react-fontawesome';
import SchemaContainer from './SchemaContainer';

const defaultUser = {
    id: null,
    first: '',
    last: '',
    password: null,
    nick: null,
    email: '',
    bio: '',
    editor: false
};

class UserDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: defaultUser };
        
        this.saveUser = this.saveUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, user } = nextProps.userQuery;

        if (!loading && user) this.setState({ user });
    }

    //TODO: Redux
    //TODO: Validation!
    saveUser = () => {
        const user = {...this.state.user};

        this.props.upsertUser({ variables: { user } })
            .then(({ data }) => {
                console.log('upsert success!', data);
            }).catch((error) => {
                console.error('there was an error sending the upsertUser', error);
            });
    }

    render() {
        //If it's new (no queryId), it'll never be loading, just show dropzone
        //otherwise the userQuery will tell the rest of the cmps if it's done loading
        const loading = !this.props.queryId ? false : this.props.userQuery.loading;

        const disableSave = loading || 
        //TODO: Break this out to a validation function
            !this.state.user.first ||
            !this.state.user.last ||
            !this.state.user.email ||
            !!this.state.user.editor;

        return (
            <form onSubmit={(event) => { event.preventDefault(); this.saveUser(); }}>
                
                
                {/* Debug */}
                <div>{this.state.user ? JSON.stringify(this.state.user) : ''}</div>
            </form>
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