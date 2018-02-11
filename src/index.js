import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client/lib/index';
import { ApolloProvider } from 'react-apollo';

import 'vendor';
import CrowdPhotoApp from './containers/CrowdPhotoApp/CrowdPhotoApp';
import cleanTypenameFieldLink from 'utils/cleanTypenameFieldLink';

const uri = 'http://localhost:9000';
const uploadLink = createUploadLink({ uri });

// Apollo client
const client = new ApolloClient({
    link: ApolloLink.from([cleanTypenameFieldLink, uploadLink]),
    cache: new InMemoryCache(),
    credentials: 'same-origin' //TODO: Make this more stringent on prod
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <CrowdPhotoApp />
    </ApolloProvider>,
    document.getElementById('root'),
);

registerServiceWorker();
