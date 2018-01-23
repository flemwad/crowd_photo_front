import React from 'react';
import ReactDOM from 'react-dom';

import { HttpLink, ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'

import './index.css';
import App from './App';
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
