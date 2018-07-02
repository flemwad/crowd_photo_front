import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { set } from 'lodash';
import FA from 'react-fontawesome';

import { StyledSaveButton, StyledInput, StyledTextarea } from './styles';

import SpinnyLoadingText from '../Loading/SpinnyLoadingText';

class User extends React.Component {
    constructor(props) {
        super(props);
        
        if (!props.loading && props.user) this.state = { user: props.user };

        this.updateUser = this.updateUser.bind(this);
        this.UserInfoCmp = this.UserInfoCmp.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && nextProps.user) this.setState({ user: nextProps.user });
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

    UserInfoCmp() {
        //TODO: Break this out to a validation function
        const disableSave = this.props.loading || 
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
                        onClick={() => { this.props.saveUser(this.state.user); }}>
                        <FA name="save" /> Save
                    </StyledSaveButton>
                </div>

                {/* Debug */}
                <div>{this.state.user ? JSON.stringify(this.state.user) : ''}</div>
            </form>
        );
    }

    render() {
        const UserLoadingCmp = () => <SpinnyLoadingText />;

        let UserCmp = null;
        if (this.props.loading) UserCmp = UserLoadingCmp;
        else UserCmp = this.UserInfoCmp;

        return <UserCmp />;
    }
}

User.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    isNew: PropTypes.bool,
    editorCheckboxDisabled: PropTypes.bool,
    saveUser: PropTypes.func
}

export default User;