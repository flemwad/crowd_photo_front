import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { set } from 'lodash';

import { StyledSaveButton, StyledInput, StyledTextarea } from './styles';

import FA from 'react-fontawesome';
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
    constructor(props) {
        super(props);

        this.state = { user: defaultUser };
        
        this.saveUser = this.saveUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
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

    //TODO: Redux
    //TODO: Abstract
    updateUser = (event) => {
        //TODO: Add some type of validation
        let user = { ...this.state.user };

        //This could be dicey if type isn't set correctly on inputs
        let updateVal = event.target.value; 
        if (event.target.type === 'number') updateVal = parseInt(updateVal, 10); 
        if (event.target.type === 'checkbox') updateVal = event.target.checked;

        //Create a update object that will set the event.target.value on state
        //We can deeply refer to objects as long as the id is set properly on the DOM object
        //e.g. event.target.id = 'meta.userRating'
        let updateDef = {};
        set(updateDef, event.target.id, {$set: updateVal});

        user = update(user, updateDef)
        this.setState({ user });
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
            <form onSubmit={(event) => { event.preventDefault(); this.saveUser(); }}>
                <div className="form-group">
                    <label htmlFor="first">first name</label>
                    <StyledInput id="first"
                        className="form-control"
                        value={this.state.user.first}
                        onChange={event => this.updateUser(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="last">last name</label>
                    <StyledInput id="last"
                        className="form-control"
                        value={this.state.user.last}
                        onChange={event => this.updateUser(event)} />
                </div>
                    <label htmlFor="nick">nickname</label>
                    <StyledInput id="nick"
                        className="form-control"
                        value={this.state.user.nick}
                        onChange={event => this.updateUser(event)} />
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <StyledInput id="email"
                        type="email"
                        className="form-control"
                        value={this.state.user.email}
                        onChange={event => this.updateUser(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">bio</label>
                    <StyledTextarea id="bio"
                        className="form-control"
                        value={this.state.user.bio}
                        onChange={event => this.updateUser(event)}>
                    </StyledTextarea>
                </div>
                <div className="form-check">
                    <StyledInput id="editor"
                        type="checkbox" 
                        className="form-check-input" 
                        value={this.state.user.editor} 
                        defaultChecked={this.state.user.editor}
                        onClick={event => this.updateUser(event)} />
                    <label className="form-check-label" htmlFor="editor">editor</label>
                </div>
                <div className='d-flex justify-content-end'>
                    <StyledSaveButton color="success"
                        disabled={disableSave}
                        className="m-1"
                        onClick={() => { this.saveUser(); }}>
                        <FA name="save" /> Save
                    </StyledSaveButton>
                </div>

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
