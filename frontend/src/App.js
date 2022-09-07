import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./Components/LoginFormPage";
import Navigation from "./Components/Navigation";
import SignupFormPage from "./Components/SignUpForm";
import SongsPage from "./Components/SongsPage";
import HomePage from "./Components/HomePage";
import * as sessionActions from "./store/session"
import { returnAllSongs } from "./store/songs";
import SongCreateForm from "./Components/SongCreateForm";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(returnAllSongs())
  }, [dispatch]);

  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <div className="container">

        <div className="header">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="content">
          {isLoaded && (
            <Switch>

              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/login">
                <LoginFormPage />
              </Route>

              <Route path="/signup">
                <SignupFormPage />
              </Route>

              <Route exact path="/songs">
                <SongsPage />
              </Route>

              {/* route to create song */}
              <Route path="/songs/create">
                <SongCreateForm/>
              </Route>

            </Switch>
          )}
        </div>
        {/* <div className="footer">
            <div className="player"></div>
        </div> */}
      </div>
    </>
  );
}

export default App;
