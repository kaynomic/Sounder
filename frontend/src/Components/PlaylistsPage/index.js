import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as playlistActions from "../../store/playlists";
import plPic from "../../images/playlist-pic.png";
import "./PlaylistsPage.css";

export default function PlaylistsPage() {

    const playlists = Object.values(useSelector(state => state.playlists));
    // console.log("playlists", playlists);
    let { playlistId } = useParams();
    // const user = useSelector(state => state.session.user);

    // console.log("user", user);
    const dispatch = useDispatch();
    const history = useHistory();

    if (!playlistId) {
        playlistId = 0;
    }

    useEffect(() => {
        dispatch(playlistActions.returnAllPLs());
    }, [dispatch])

    const handlePLCreatePage = () => {
        history.push("/playlists/create");
    }

    const handlePLCardPage = (playlistId) => {
        dispatch(playlistActions.returnPL(playlistId))
        history.push(`/playlists/${playlistId}`);
    }

    return (
        <section className="plCard-container">
            <div className="plCard-section">
                { playlists && (playlists.map(playlist => {
                    return (
                        <div className="pl-row" key={playlist.id} onClick={() => handlePLCardPage(playlist.id)}>
                            <div className="img-pl-box">
                                <img className="pl-image" src={plPic} alt={`${playlist.title}`} />
                                    <div className="word-box-1">
                                        <h3>{playlist.name}</h3>
                                        {/* <p>Made by {user.username}</p> */}
                                    </div>
                            </div>
                        </div>
                    )
                }))}
            </div>
            {/* add playlist */}
            <div className="add-pl-container">
                <button className="pl-nav-button" onClick={handlePLCreatePage}>
                    + Add Playlist
                </button>
            </div>
        </section>
    )
}


    // {playlists && (playlists.map(playlist => {
    //                  return (
    //                  <div className="pl-row" key={playlist.id}
    //                     onClick={() => handlePLCardPage(playlist.id)}>
    //                        <img className="pl-image" src={plPic} alt={`${playlist.title}`} />
    //                        <p>{playlist.title}</p>
    //                         {/* <p></p> */}
    //                         {/* </div> */}
