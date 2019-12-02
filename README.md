

This is a simple application for displaying Newest Bitcoin block records, as well as information for the individual blocks.

Technology Used

The web app was built using ReactJS, Node.js, Express.js, Apollo GraphQL

How It Works

A single-page web app built with React makes queries trough Apollo client to GraphQL HTTP server. The server is using graphqlHTTP middleware which allows us to use it with Express.js framework(Node.js).

 Every GraphQL server has two core parts that determine how it works: a schema and resolve functions. 
-The schema is a model of the data that can be fetched through the GraphQL server. 
-Resolve functions are like little routers. They specify how the types and fields in the schema are connected to various backends, in our case they make axios calls to blockchain.info APIs.

UX/UI

This is not my strong point and I have used plain HTML.

BACKEND

Our backend is simple. Composed of two components, GraphQL schema, and express server. I have written GraphQL schema in plain Javascript as it was simpler for me to understand and make use of it in time that I had. Although i am aware that constructing a schema (GraphQL schema language)  using 'buildSchema'  and separating resolver is a better way to do it. Our schema model defines what queries clients are allowed to make, what types of data can be fetched from the server, and what the relationships between these types are. In our case we have two main types:

1.BlockListType - which is GraphQLObjectType with hash, time and height as parameters for blocklist requests.
2.BlockType - which is GraphQLObjectType with many different parameters for individual block requests.

Resolve functions are used by GraphQL servers to talk to any kind of backend. (DB, API, Microservices).
We have two main resolve functions:

1.Blocks - which makes axios request to fetch the latest blocks from the API endpoint.
2.Block - which uses individual blocks hash (as args) to fetch detailed data of that block from the API endpoint.

FRONTEND

I have decided to use React Hooks with Apollo Client. It resulted in much cleaner and easy to read code, and it should have better support for Typescript language.
In our App.js we setup 'AppoloClient' and connect it to our backend and set up our 'InMemoryCache'. It dramatically speeds up the execution of queries that don't rely on real-time data by storing it in-memory cache. Everything is wrapped in 'ApolloProvider' component which allows us to use our client throughout the app.

We have two main routes:

1. Route '/' BlockList.js  where we use 'graphql-tag' module which uses 'gql' function to Query our GraphQL API. Once BlockList component starts to render it uses useQuery() hook on GET_BLOCKLIST (gql function) to Query GraphQL API and fetch the data needed for our component. Also, we have setup refetching function(refetch) to keep our cashed data in sync with dynamic data that our API provides. I have used this instead of polling(time interval polls) because I believe that this puts unnecessary load on the server. If I would look for real-time data I would use web-sockets.
2. Route '/block/:hash' Block.js where we use the same principle as beforehand with one difference. Now we use variable (in this case unique hash) to Query our GraphQL API for specific block. We use 'Moment.js' to format UNIX time and 'satoshi-bitcoin' to calculate the number of BTC.
