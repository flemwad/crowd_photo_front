//react-apollo turns a query string literal that is wrapped with gql-tag into a HOC
//That HOC wraps your component and gives you the data as the name option on this.props
//that new HOC'd component will be composed with the client and talks to my graphql server
import { graphql } from 'react-apollo';
//translates a string literal into a digestable query/mutation format for the react-apollo HOC
import gql from 'graphql-tag';

export const LIST_USERS = graphql(gql`
    query {
        users {
            id
            nick
            first
            last
        }
    }
    `, 
    { 
        name: 'userListQuery' 
    }
);
