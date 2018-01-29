import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import 'font-awesome/css/font-awesome.min.css'

import { HttpLink, ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

// Apollo client
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080' }),
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
