import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as playlistActions from "../../../store/playlists";
import plPic from "../../../images/playlist-pic.png";
import "./PlaylistsCard.css";

export default function PlaylistsCard() {

    const { playlistId } = useParams();
    const user = useSelector(state => state.session.user);
    const playlist = useSelector(state => state.playlists[`${playlistId}`]);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (playlist) setIsLoaded(true);
    }, [playlist])

    const handleDelete = (playlistId) => {
        dispatch(playlistActions.byePL(playlistId));
        history.push("/playlists");
    }

    return isLoaded && (
        <>
            <div className="plCard-container">
                <div className="plCard-photo">
                    <img className="plCard-img" src={plPic} alt="default pl" />
                </div>
                <div className="plCard-name">
                    <h2>{playlist.name}</h2>
                </div>
                { playlist.userId === user.id && <> <button type="submit" className="plCard-delete" onClick={() => handleDelete(playlistId)}>
                    Delete Playlist
                </button> </> }
            </div>
        </>
    )
}
