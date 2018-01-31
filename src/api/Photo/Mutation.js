import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

//TODO: Go one step further and put the functions and class composition in here?

export const HYPE_PHOTO = graphql(gql`
        mutation {
            hypePhoto(id: $id) {
                id,
                meta {
                    hype
                }
            }
        }
    `, { name: 'hypePhoto' });

export const UPSERT_PHOTO = graphql(gql`
        mutation ($photoInput: PhotoInput!) {
            upsertPhoto(photoInput: $photoInput) {
                id
            }
        }
    `, { name: 'upsertPhoto' });

export const UPLOAD_IMAGE = graphql(gql`
        mutation($file: Upload!) {
            uploadImage(file: $file) {
                name
            }
        }
    `, { name: 'uploadImage' });
