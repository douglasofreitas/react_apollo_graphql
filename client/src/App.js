import React, { Component } from 'react';
import {
  ApolloClient,
  gql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';
import logo from './logo.svg';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

//mock
/*
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});
*/

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  networkInterface,
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    
    );
  }
}

export default App;
