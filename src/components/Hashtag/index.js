import React, { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { useGlobalState } from "../../hooks/globalState";
import api from "../../services/api";
import Loader from "react-loader-spinner";

import "./styles.css";

export default function Hashtag({ name }) {
  const {
    setHashtags,
    setTweets,
    setCurrent,
    current,
    tweets,
  } = useGlobalState();
  const [loading, setLoading] = useState(false);

  function deleteHashtag() {
    setHashtags((state) => state.filter((hashtag) => hashtag.name !== name));

    let submitValue = name;

    if (submitValue.includes("#")) {
      submitValue = submitValue.split("#")[1];
    }

    if (tweets.find((tweet) => tweet.hashtag === name)) {
      setTweets([]);
    }

    setCurrent("");
    api.delete(`/hashtag/${submitValue}`);
  }

  function findTweetsByHashtag() {
    setLoading(true);
    api
      .get(`/tweet`, { params: { hashtag: name } })
      .then((response) => {
        console.log("findtweets", response.data);
        let res = response.data ? response.data : [];
        setLoading(false);
        setCurrent(name);
        setTweets(res);
      })
      .catch((err) => setLoading(false));
  }

  return (
    <li
      className="hashtag"
      style={{ backgroundColor: current === name ? "#0066ab" : "#3498db" }}
    >
      <div>
        <span onClick={() => findTweetsByHashtag()}>{name}</span>
        {loading ? (
          <Loader
            type="TailSpin"
            color="#fff"
            height={13}
            width={13}
            style={{ display: "inline", marginLeft: 15 }}
          />
        ) : (
          <FaTrash className="trashIcon" onClick={() => deleteHashtag()} />
        )}
      </div>
    </li>
  );
}
