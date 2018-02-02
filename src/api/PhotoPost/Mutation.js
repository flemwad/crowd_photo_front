//react-apollo turns a mutation string literal that is wrapped with gql-tag into a HOC
//That HOC wraps your component and gives you functions on this.props
//that new HOC'd component will be composed with the client and talks to my graphql server
import { graphql } from 'react-apollo';
//translates a string literal into a digestable query/mutation format for the react-apollo HOC
import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

export const HYPE_PHOTO_POST = graphql(gql`
        mutation {
            hypePhotoPost(id: $id) {
                id,
                meta {
                    hype
                }
            }
        }
    `, { name: 'hypePhotoPost' });

export const UPSERT_PHOTO_POST = graphql(gql`
        mutation ($photoPost: PhotoPostInput!) {
            upsertPhotoPost(photoPost: $photoPost) {
                id
            }
        }
    `, { name: 'upsertPhotoPost' });

//I'm sending the image right on upsert mutation now, but this could be useful for later
// export const UPLOAD_IMAGE = graphql(gql`
//         mutation($upload: Upload!) {
//             uploadImage(upload: $upload) {
//                 name
//             }
//         }
//     `, { name: 'uploadImage' });
