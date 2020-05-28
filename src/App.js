import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import PageWrapper from "./pages/PageWrapper/PageWrapper";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/rooms/:roomCode"
          exact
          render={props => (
            <PageWrapper>
              <RoomPage {...props} />
            </PageWrapper>
          )}
        ></Route>
        <Route path="/" exact>
          <PageWrapper>
            <LandingPage />
          </PageWrapper>
        </Route>
        <Route path="*">
          <PageWrapper>
            <NotFoundPage />
          </PageWrapper>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
