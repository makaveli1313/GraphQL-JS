import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BlockItem from "./BlockItem";

const GET_BLOCKLIST = gql`
  query BlockListQuery {
    blocks {
      hash
      time
      height
    }
  }
`;

const BlockList = () => {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_BLOCKLIST
  );
  if (networkStatus === 4) return "Refetching!";
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>ERROR</p>;


  return (
    <Fragment>
      <h1>Block List:</h1>
      <button onClick={() => refetch()}>Refetch new Blocks</button>
      {data.blocks.map(blocks => {
        return <BlockItem key={blocks.hash} blocks={blocks} />;
      })}
    </Fragment>
  );
};

export default BlockList;
