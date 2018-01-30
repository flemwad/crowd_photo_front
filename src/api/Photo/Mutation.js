import gql from 'graphql-tag';

//TODO: Is there a way to share theses string literals with the back end? 
//Should I get some kind of "shared" repo going?

export const HYPE_PHOTO = (id) => {
    return gql`
        mutation HyptePhoto {
            hypePhoto(id: "${id}") {
                id,
                meta {
                    hype
                }
            }
        }
    `
};

export const UPSERT_PHOTO = () => {
    return gql`
        mutation UpsertPhoto($photoInput: PhotoInput) {
            upsertPhoto(photoInput: $photoInput) 
            {
                id
            }
        }
    `
};

