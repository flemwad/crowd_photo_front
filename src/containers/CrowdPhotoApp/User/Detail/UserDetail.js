import React from 'react';
import PropTypes from 'prop-types';


// import {  } from './styles';

import SchemaContainer from './SchemaContainer';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: defaultUser };
        
        this.saveUser = this.saveUser.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.userQuery) return this.setState({user: defaultUser});
        
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

        if (loading) return (<div>Loading...</div>);

        const disableSave = loading || 
        //TODO: Break this out to a validation function
            !this.state.user.first ||
            !this.state.user.last ||
            !this.state.user.email ||
            !this.state.user.nick;

        return (
            
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
