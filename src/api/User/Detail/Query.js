//react-apollo turns a query string literal that is wrapped with gql-tag into a HOC
//That HOC wraps your component and gives you the data as the name option on this.props
//that new HOC'd component will be composed with the client and talks to my graphql server
import { graphql } from 'react-apollo';
//translates a string literal into a digestable query/mutation format for the react-apollo HOC
import gql from 'graphql-tag';

export const GET_USER = graphql(gql`
    query GetUser($id: String!) {
        user(id: $id) {
            id
            first
            last
            nick
            email
            bio
            editor
            createdUTS
        }
    }
    `,
    {
        name: 'userQuery',
        //the parent can set the id we should query for
        options: (props) => ({ variables: {id: props.queryId} }),
        //if the components this.props.new is true, we'll skip the GET query
        skip: (props) => !props.queryId 
    }
);