import React from "react";

import HashtagsSidebar from "../../components/HashtagsSidebar";
import { useGlobalState } from "../../hooks/globalState";
import Tweet from "../../components/Tweet";

import "./styles.css";

export default function Tweets() {
  const { tweets, current } = useGlobalState();

  return (
    <div className="pageContainer">
      <HashtagsSidebar />
      <div className="content" id="tweetsContainer">
        <h1 id="hashtagTitle">{current}</h1>
        <div id="tweetsContent">
          {tweets &&
            tweets.length > 0 &&
            tweets.map((tweet) => (
              <Tweet
                key={tweet.tweetId}
                username={tweet.username}
                text={tweet.text}
                sentiment={tweet.sentiment}
                profileImageURL={tweet.profileImageURL}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
