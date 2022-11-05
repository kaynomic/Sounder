import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/songs";
import './SongsPage.css';


export default function SongsPage() {
    const songs = Object.values(useSelector(state => state.songs));
    let { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    if (!songId) songId = 0;

    useEffect(() => {
        dispatch(songActions.returnAllSongs());
    }, [dispatch])

    const handleSongCreatePage = () => {
        history.push("/songs/create");
    }

    const handleSongCardPage = (songId) => {
        dispatch(songActions.returnSong(songId))
        history.push(`/songs/${songId}`);
    }


    return (
        <section className="song-page-container">
            <div className="song-section">
                {songs && (songs.map(song => {
                    return (
                        <div className="song-row" key={song.id} onClick={() => handleSongCardPage(song.id)}>
                            {/* <img src={`${song.previewImage}`} alt={`${song.title}`}/> */}
                            <img className="song-image" src={"https://i.pinimg.com/originals/66/64/3e/66643e3e7feea9b07d469b229c1b2722.jpg"} alt={`${song.title}`} />
                            <p>{song.title}</p>
                            <p>{song.description}</p>
                        </div>
                    )
                }))}
            </div>
                {/* add song */}
                <div className="add-song-container">
                    <button
                    className="song-nav-button"
                    onClick={handleSongCreatePage}>
                         + Add Song
                    </button>
                </div>
        </section>
    )
}
