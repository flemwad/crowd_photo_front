import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PHOTOS_QUERY = gql`
    query GetPhotos {
        photos {
            id
            postName
            whatToDo
            meta {
                hype
                category
            }
        }
    }
`;

function App({ data: { loading, photos } }) {
    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                <div>
                    <h1>{photos[0].meta.category}</h1>
                    <div>{photos[0].postName} -- {photos[0].meta.hype}</div>
                    <span>{photos[0].whatToDo}</span>
                </div>
            }
        </div>
    );
};

export default graphql(PHOTOS_QUERY)(App);