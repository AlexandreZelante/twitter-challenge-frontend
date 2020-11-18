import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { useGlobalState } from "../../hooks/globalState";
import { useWindowWidth } from "@react-hook/window-size";
import Loader from "react-loader-spinner";

import Hashtag from "../Hashtag";

import api from "../../services/api";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

export default function HashtagsSidebar() {
  const location = useLocation();
  const width = useWindowWidth();
  const {
    hashtags,
    setHashtags,
    setCurrent,
    setTweets,
    current,
  } = useGlobalState();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!current) {
      if (hashtags.length === 0) {
        api.get("/hashtag").then((response) => {
          setHashtags(response.data.reverse());
          if (response.data.length > 0) {
            api
              .get(`/tweet`, { params: { hashtag: response.data[0].name } })
              .then((tweetResponse) => {
                let res = tweetResponse.data ? tweetResponse.data : [];
                setTweets(res);
                setCurrent(response.data[0].name);
              });
          }
        });
      }
    }
  }, [current, setHashtags, setCurrent, setTweets, hashtags]);

  function submitHashtag(e) {
    e.preventDefault();

    let submitValue = text;

    if (!submitValue.includes("#")) {
      submitValue = `#${text}`;
    }

    if (text && !hashtags.find((hashtag) => hashtag.name === submitValue)) {
      setLoading(true);
      setHashtags((state) => [{ name: submitValue }, ...state]);
      api
        .post("/hashtag", { name: submitValue })
        .then((response) => {
          console.log(response.data);
          setTweets(response.data);
          setCurrent(submitValue);
          setLoading(false);
        })
        .catch((err) => setLoading(false));
      setText("");
    }
  }

  return (
    <aside id="sidebarContainer">
      <header id="header">
        <h1>#HashtagSearcher</h1>
        <nav>
          <Link to="/" className={location.pathname === "/" ? "current" : ""}>
            Hashtags
          </Link>
          <Link
            to="/tweets"
            className={location.pathname === "/tweets" ? "current" : ""}
          >
            Tweets
          </Link>
        </nav>
      </header>

      {width > 768 && <h1 style={{ marginBottom: 15 }}>Pesquisar</h1>}
      <div id="searchContainer">
        <form onSubmit={submitHashtag}>
          <FaSearch className="searchIcon" />
          <input
            id="searchInput"
            type="text"
            placeholder="Digite a hashtag"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <button onClick={submitHashtag}>
          {loading ? (
            <Loader
              type="TailSpin"
              color="#fff"
              height={25}
              width={25}
              style={{ display: "inline", marginLeft: 15 }}
            />
          ) : (
            "Button"
          )}
        </button>
      </div>

      {width > 768 && <h1 style={{ marginBottom: 15 }}>Hashtags</h1>}
      <div id="hashtagsContainer">
        <ul>
          {hashtags.map((hashtag, index) => (
            <Hashtag name={hashtag.name} key={`${index}-${hashtag}`} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
