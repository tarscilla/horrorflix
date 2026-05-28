import React from "react";

import { useParams } from "react-router";

const Player = (props) => {
  const { category } = useParams();

  const embedUrl =
    category === "movie"
      ? `https://myembed.biz/filme/${props.id}`
      : `https://myembed.biz/serie/${props.id}`;

  return (
    <div className="video">
      <iframe
        src={embedUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
        title="player"
      ></iframe>
    </div>
  );
};

export default Player;