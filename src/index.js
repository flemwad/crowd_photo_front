import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import 'font-awesome/css/font-awesome.min.css'

import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';

import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

// Apollo client
const client = new ApolloClient({
    link: createUploadLink({ uri: 'http://localhost:8080' }),
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
