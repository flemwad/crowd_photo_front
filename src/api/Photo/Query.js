import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

export const GET_PHOTO = (id) => {
    return gql`
        query GetPhoto {
            photo(id: "${id}") {
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
    `
};

export const GET_PHOTOS = () => {
    return gql`
        query GetPhotos {
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
    `
};