import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../../store/songs";
import * as playlistActions from "../../../store/playlists";
import * as playSongActions from "../../../store/playlistSongs";
import plPic from "../../../images/playlist-pic.png";
import "./PlaylistsCard.css";

export default function PlaylistsCard() {

    const { playlistId } = useParams();
    const user = useSelector(state => state.session.user);
    const songs = Object.values(useSelector(state => state.songs));
    const playlist = useSelector(state => state.playlists[`${playlistId}`]);
    const playSongs = useSelector(state => state.playlistSongs);
    // console.log("playSongs", playSongs);
    console.log("playlist", playlist);

    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);
    const [songId, setSongId] = useState(null);

    useEffect(() => {
        if (playlist) setIsLoaded(true);
    }, [playlist])

    useEffect(() => {
        dispatch(playlistActions.returnAllPLs())
    }, [dispatch])

    useEffect(() => {
        dispatch(songActions.returnAllSongs());
    }, [dispatch])

    const handleDelete = (playlistId) => {
        dispatch(playlistActions.byePL(playlistId));
        history.push("/playlists");
    }

    const handleClick = e => {
        e.preventDefault();

        // console.log("playlist.id", playlist.id);
        // console.log("songId", songId);
        // console.log("songId", typeof songId);
        // console.log("object.values songId", Object.values(songId));
        dispatch(playSongActions.addingSong(Number(playlist.id), Number(songId)))
    }

    const userSongs = songs.filter(song => {
        return song.userId === user.id
    });

    // console.log("songs", userSongs);

    return isLoaded && (
        <>
            <form className="plCard-container" onSubmit={handleClick}>
                <div className="plCard-photo">
                    <img className="plCard-img" src={plPic} alt="default pl" />
                </div>
                <div className="plCard-name">
                    <h2>{playlist.name}</h2>
                </div>

                { playlist.userId === user.id &&
                <>
                <div className="pl-section">
                    <label htmlFor="songs">Choose A Song: </label>
                    <select
                    name="songs"
                    className="pick-a-song"
                    placeholder="Choose A Song"
                    onChange={e => {
                        console.log("e.target.value", e.target.value);
                        setSongId(Number(e.target.value));
                        console.log("song.id (after)", songId);
                        console.log("song.id (after) typeof", typeof songId);
                    }}
                    >
                        { userSongs && userSongs.map(song => {

                            // console.log("song.id inside map", song.id);
                            return (
                                <option
                                value={Number(song.id)}
                                key={song.id}
                                // onClick={() => {
                                //     setSongId(song.id)}
                                //     }
                                    >
                                    {song.title}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <button
                type="submit"
                className="add-song-button"
                // onClick={e => {
                //     console.log("song.id inside button onClick", songId);
                //     handleClick(e);
                //     }}
                    >
                    Add Song To Playlist
                </button>
                <button type="submit" className="plCard-delete" onClick={() => handleDelete(playlistId)}>
                    Delete Playlist
                </button> </> }
            </form>
        </>
    )
}
