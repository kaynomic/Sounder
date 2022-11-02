import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
// import LoginFormModal from "./Components/LoginFormModal";
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
import PlaylistsPage from "./Components/PlaylistsPage";
import PlaylistsCard from "./Components/PlaylistsPage/PlaylistsCard";
import ErrorPage from "./Components/ErrorPage";
import PlaylistCreateForm from "./Components/PlaylistCreateForm";
import CurrentUserPage from "./Components/CurrentUserPage";
import AlbumsPage from "./Components/AlbumsPage";
import AlbumsCard from "./Components/AlbumsPage/AlbumsCard";
import AlbumEditForm from "./Components/AlbumEditForm";
import AlbumCreateForm from "./Components/AlbumCreateForm";

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

              {/* <Route exact path="/login">
                <LoginFormModal />
              </Route> */}

              <Route exact path="/signup">
                <SignupFormPage />
              </Route>

              <Route exact path="/me">
                <CurrentUserPage />
              </Route>

              <Route exact path="/songs">
                <SongsPage />
              </Route>

              <Route exact path="/albums/:albumId/songs/create">
                <SongCreateForm />
              </Route>

              <Route exact path="/songs/:songId">
                <SongsCard />
              </Route>

              <Route exact path="/songs/:songId/edit">
                <SongEditForm />
              </Route>

              <Route exact path="/albums">
                <AlbumsPage />
              </Route>

              <Route exact path="/albums/create">
                <AlbumCreateForm />
              </Route>

              <Route exact path="/albums/:albumId">
                <AlbumsCard />
              </Route>

              <Route exact path="/albums/:albumId/edit">
                <AlbumEditForm />
              </Route>

              <Route exact path="/playlists">
                <PlaylistsPage />
              </Route>

              <Route exact path="/playlists/create">
                <PlaylistCreateForm />
              </Route>

              <Route exact path="/playlists/:playlistId">
                <PlaylistsCard />
              </Route>

              <Route>
                <ErrorPage />
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
