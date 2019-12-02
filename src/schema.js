const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const axios = require("axios");

const BlockListType = new GraphQLObjectType({
  name: "Blocks",
  fields: () => ({
    hash: { type: GraphQLString },
    time: { type: GraphQLInt },
    height: { type: GraphQLInt },
  }),
});

const BlockType = new GraphQLObjectType({
  name: "Block",
  fields: () => ({
    main_chain: { type: GraphQLBoolean },
    time: { type: GraphQLInt },
    n_tx: { type: GraphQLInt },
    bits: { type: GraphQLInt },
    height: { type: GraphQLInt },
    size: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    mrkl_root: { type: GraphQLString },
    nonce: { type: GraphQLInt },
    fee: { type: GraphQLInt },
    prev_block: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    blocks: {
      type: new GraphQLList(BlockListType),
      resolve(parent, args) {
        return axios
          .get("https://blockchain.info/blocks?format=json")
          .then(res => res.data.blocks)
          .catch(err => console.log(err));
      },
    },
    block: {
      type: BlockType,
      args: {
        hash: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://blockchain.info/rawblock/${args.hash}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
