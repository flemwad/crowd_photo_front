import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PHOTOS_QUERY = gql`
query GetPhotos {
  photos {
    id
    postName
    meta {
        votes
    }
  }
}
`;

function App({ data: { loading, photos } }) {
    return (
        <div>
            {loading ? <p>Loading...</p> :
            <div>{photos[0].postName} -- {photos[0].meta.votes}</div>}
        </div>
    );
}

export default graphql(PHOTOS_QUERY)(App);