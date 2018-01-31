import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

export const GET_PHOTO = graphql(gql`
    query GetPhoto($id: String!) {
        photo(id: $id) {
            id
            postName
            whatToDo
            unixTime
            image {
                base64
                size
                name
                extension
            }
            meta {
                hype
                userRating
                editorRating
                category
            }
        }
    }
`,
    {
        name: 'photoQuery',
        options: (props) => ({ variables: {id: props.id} }),
        skip: (props) => props.new
    });

export const GET_PHOTOS = graphql(gql`
        query {
            photos {
                id
                postName
                image {
                    name
                    extension
                }
                meta {
                    hype
                    userRating
                    editorRating
                    category
                }
            }
        }
    `, { name: 'photosQuery' });
