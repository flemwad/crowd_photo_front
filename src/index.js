import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import 'font-awesome/css/font-awesome.min.css'

import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client/lib/index';
import { ApolloProvider } from 'react-apollo';

import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

import cleanTypenameFieldLink from 'utils/cleanTypenameFieldLink';

const uri = 'http://localhost:8080';
const uploadLink = createUploadLink({ uri });

// Apollo client
const client = new ApolloClient({
    link: ApolloLink.from([cleanTypenameFieldLink, uploadLink]),
    cache: new InMemoryCache(),
    credentials: 'same-origin' //TODO: Make this more stringent on prod
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);

registerServiceWorker();
