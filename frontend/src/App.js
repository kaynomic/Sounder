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
import MediaPlayer from "./Components/SongsPage/MediaPlayer/MediaPlayer";
import SongsCard from "./Components/SongsPage/SongsCard";
import SongEditForm from "./Components/SongEditForm";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(returnAllSongs())
  }, [dispatch]);

  // const currentUser = useSelector(state => state.session.user);

  return (
    <>
        <div className="header">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="content">
          {isLoaded && (
            <Switch>

              <Route exact path="/">
                <HomePage />
              </Route>

              <Route exact path="/login">
                <LoginFormPage />
              </Route>

              <Route exact path="/signup">
                <SignupFormPage />
              </Route>

              <Route exact path="/songs">
                <SongsPage />
              </Route>

              <Route exact path="/songs/create">
                <SongCreateForm/>
              </Route>

              <Route exact path="/songs/:songId">
                <SongsCard />
              </Route>

              <Route exact path="/songs/:songId/edit">
                <SongEditForm />
              </Route>

            </Switch>
          )}
        </div>
        <div className="footer">
          <MediaPlayer />
        </div>
    </>
  );
}

export default App;
