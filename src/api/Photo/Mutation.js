//react-apollo turns a mutation string literal that is wrapped with gql-tag into a HOC
//That HOC wraps your component and gives you functions on this.props
//that new HOC'd component will be composed with the client and talks to my graphql server
import { graphql } from 'react-apollo';
//translates a string literal into a digestable query/mutation format for the react-apollo HOC
import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

export const HYPE_PHOTO_POST = graphql(gql`
        mutation ($id: String!){
            hypePhotoPost(id: $id) {
                id,
                meta {
                    hype
                }
            }
        }
    `, { name: 'hypePhotoPost' });

export const DELETE_PHOTO_POST = graphql(gql`
    mutation ($id: String!){
        deletePhotoPost(id: $id)
    }
`, { name: 'deletePhotoPost' });