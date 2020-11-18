import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import TwitterLogo from "../../images/twitterLogo.png";

import HashtagsSidebar from "../../components/HashtagsSidebar";
import { useGlobalState } from "../../hooks/globalState";

import "./styles.css";

export default function Geolocation() {
  const { tweets } = useGlobalState();
  const [latitude, setLatitude] = useState(-23.5836276);
  const [longitude, setLongitude] = useState(-46.5692615);
  const [zoom] = useState(7);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  function getCenter() {
    if (tweets && tweets.length > 0) {
      return { lat: tweets[0].latitude, lng: tweets[0].longitude };
    } else {
      return {
        lat: latitude,
        lng: longitude,
      };
    }
  }

  function getZoom() {
    if (tweets && tweets.length > 0) {
      return 9;
    } else {
      return zoom;
    }
  }

  return (
    <div className="pageContainer">
      <HashtagsSidebar />
      <div className="content">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBE58-hrfZoh4B79cpe0Fs7DKCILvj0uq0" }}
          center={getCenter()}
          zoom={getZoom()}
        >
          {tweets &&
            tweets.length > 0 &&
            tweets.map((tweet) => (
              <img
                key={tweet.tweetId}
                src={TwitterLogo}
                lat={tweet.latitude}
                lng={tweet.longitude}
                height={30}
                width={30}
                alt="username"
              />
            ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
