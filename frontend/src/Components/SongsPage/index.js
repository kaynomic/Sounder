import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as songActions from "../../store/songs";
// import MediaPlayer from "./MediaPlayer";
import './SongsPage.css';


export default function SongsPage() {
    const songs = Object.values(useSelector(state => state.songs));
    // const song = songs[0];
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);

    const history = useHistory();

    useEffect(() => {
        dispatch(songActions.returnAllSongs());
    }, [dispatch])

    const handleSongCreatePage = () => {
        history.push("/songs/create");
    }

    return (
        <section className="song-page-container">
            <div className="song-section">
                {songs && (songs.map(song => {
                    return (
                        <div className="song-row" key={song.id}>
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
            <div className="media-container">
                {/* add song */}

                {/* <div className="widget-container">
                    <MediaPlayer />
                </div> */}

                <section className="media-info">
                    <div className="media-info-content">
                        {/* {song.name}
                        {song.artist} */}
                        <span>
                            Song
                        </span>
                        <span>
                            Artist
                        </span>
                    </div>
                    <div>
                        <i class="fa-regular fa-heart fa-xl"></i>
                    </div>
                </section>
                <section className="media-controller-container">
                    <div className="media-controller">
                        <span>
                            <i class="fa-solid fa-shuffle fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-backward fa-xl"></i>
                        </span>
                        <span className="fa-play-container">
                            <i class="fa-solid fa-play fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-forward fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-repeat fa-xl"></i>
                        </span>
                    </div>

                </section>
                <section className="media-volume">
                    <div>
                        <span>
                            <i class="fa-solid fa-volume-high fa-xl"></i>
                        </span>
                        <span className="volume-slider-container">
                            <input className="volume-slider" type="range" min="-10" max="10" />
                        </span>
                        <span>
                            <i class="fa-solid fa-up-right-and-down-left-from-center fa-xl"></i>
                        </span>
                    </div>
                </section>
            </div>
        </section>
    )
}
