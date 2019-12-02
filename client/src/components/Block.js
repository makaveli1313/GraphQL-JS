import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import sb from "satoshi-bitcoin";

const GET_BLOCK = gql`
  query BlockQuery($hash: String!) {
    block(hash: $hash) {
      time
      n_tx
      height
      size
      weight
      mrkl_root
      nonce
      fee
      bits
      prev_block
    }
  }
`;

const Block = props => {
  const { hash } = props.match.params;
  const { data, loading, error } = useQuery(GET_BLOCK, { variables: { hash } });
  if (loading) return <h4>Loading...</h4>;
  if (error) return error;
  const {
    time,
    n_tx,
    height,
    size,
    weight,
    mrkl_root,
    nonce,
    fee,
    bits,
    prev_block,
  } = data.block;

  return (
    <Fragment>
      <h3>Hash:</h3>
      <p>{hash}</p>
      <h3>Previous Hash:</h3>
      <p>{prev_block}</p>
      <h3>Timestamp:</h3>
      <p>
        <Moment unix format="YYYY-MM-DD HH:mm">
          {time}
        </Moment>
      </p>
      <h3>Height:</h3>
      <p>{height}</p>
      <h3>Number of transactions:</h3>
      <p>{n_tx}</p>
      <h3>Merkle root:</h3>
      <p>{mrkl_root}</p>
      <h3>Fee reward:</h3>
      <p>{sb.toBitcoin(fee)} BTC</p>
      <h3>Bits:</h3>
      <p>{bits.toLocaleString()}</p>
      <h3>Weight:</h3>
      <p>{weight.toLocaleString()} WU</p>
      <h3>Size:</h3>
      <p>{size.toLocaleString()} bytes</p>
      <h3>nonce:</h3>
      <p>{nonce.toLocaleString()}</p>
      <Link to={"/"}>Back</Link>
    </Fragment>
  );
};

export default Block;
