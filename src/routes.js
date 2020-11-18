import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Geolocation from "./pages/Geolocation";
import Tweets from "./pages/Tweets";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Geolocation} />
        <Route path="/tweets" component={Tweets} />
      </Switch>
    </BrowserRouter>
  );
}
