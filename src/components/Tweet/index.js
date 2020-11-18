import React from "react";

import { TweetContainer } from "./styles";

export default function Tweet({ username, text, sentiment, profileImageURL }) {
  const dict = {
    positive: "positivo",
    negative: "negativo",
    neutral: "neutro",
  };

  return (
    <TweetContainer sentiment={sentiment}>
      <div>
        {profileImageURL && (
          <img src={profileImageURL} height={30} width={30} alt={username} />
        )}
        <h2>@{username}</h2>
      </div>

      <p>{text}</p>

      <span>Sentimento: {dict[sentiment]}</span>
    </TweetContainer>
  );
}
