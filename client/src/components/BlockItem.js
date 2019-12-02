import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const BlockItem = props => {
  const { hash, time, height } = props.blocks;

  return (
    <Fragment>
      <h3>
        Hash: <br /> {hash}
      </h3>
      <Moment unix fromNow>
        {time}
      </Moment>
      <p>Height: {height}</p>
      <Link to={`/block/${hash}`}>Details</Link>
    </Fragment>
  );
};



export default BlockItem;
