// import ProfileButton from "../Navigation/ProfileButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from "../../store/playlists";
import songCardPhoto from "../../images/song-photo-for-songPage.png";
import plPic from "../../images/playlist-pic.png";
import "./CurrentUserPage.css";


export default function CurrentUserPage() {

    const user = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const playlists = useSelector(state => state.playlists);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(playlistActions.returnAllPLs());
    }, [dispatch])

    console.log("playlists", playlists);

    // (user.id === songs.userId) && (user.id === playlists.userId)

    const songFlag = false;
    const plFlag = false;

    // Object.values(songs).some(song => user.id === song.userId ? songFlag = true : songFlag = false);


    return (
        Object.values(songs).length > 0 && Object.values(playlists).length > 0 ?
            <div className="me-container">
                <div className="me-songs-head">
                    <h2>My Songs</h2>
                </div>
                <div className="me-pl-head">
                    <h2>My Playlists</h2>
                </div>
                <div className="me-songs-body">
                    <div className="song-body-img">
                        <img src={songCardPhoto} alt="default song"></img>
                    </div>
                    <ol>
                        {Object.values(songs).map(song => {
                            if ((user.id === song.userId))

                            {
                                return (
                                    <li key={song.id}>{song.title}</li>
                                )
                            }
                            return <></>;
                        })}
                    </ol>
                </div>
                <div className="me-pl-body">
                    <div className="pl-body-img">
                        <img src={plPic} alt="default pl"></img>
                    </div>
                    <ol>
                        {Object.values(playlists).map(playlist => {
                            if ((user.id === playlist.userId)) {
                                return (
                                    <li key={playlist.id}>{playlist.name}</li>
                                )
                            }
                            return <></>;
                        })}
                    </ol>
                </div>
            </div>
            :
            <section>
                <div>
                    <h2>No Songs or Playlists Available</h2>
                </div>
            </section>
    )
}
