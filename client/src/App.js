import React, { Component } from "react";
import "./App.css";
import BlockList from "./components/BlockList";
import Block from "./components/Block";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route exact path="/" component={BlockList} />
          <Route exact path="/block/:hash" component={Block} />
        </Router>
      </ApolloProvider>
    );
  }
}
