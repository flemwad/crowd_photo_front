import React from 'react';
import SchemaContainer from './SchemaContainer';

import { CardDiv } from './styles';
import SpinnyLoadingText from 'components/Loading/SpinnyLoadingText';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.createUserCardList = this.createUserCardList.bind(this);
    }

    createUserCardList = (userList) => {
        return userList.map((item) => {
            return (
                <CardDiv key={item.id} className='card'>
                    <div className="card-body">
                        <h4 className="card-title">{item.nick}</h4>
                        <p className="card-text">{item.first + " " + item.last}</p>
                        <span>{item.bio}</span>
                        {/* <a href="#" class="btn btn-primary">See Profile</a> */}
                    </div>
                </CardDiv>
            );
        })
    }

    render() {
        const loading = this.props.userListQuery.loading;

        let userList = [];
        if (!loading) userList = this.props.userListQuery.users;

        const listItems = this.createUserCardList(userList);

        return loading ? (<SpinnyLoadingText />) :
        (
            <div>
                {listItems}

                {JSON.stringify(this.props.userListQuery.users)}
            </div>
        );
    }
}

UserList.propTypes = {}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(UserList);
