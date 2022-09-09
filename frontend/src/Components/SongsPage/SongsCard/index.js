import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../../store/songs";
import songCardPhoto from "../../../images/song-photo-for-songPage.png";

export default function SongsCard() {

    const { songId } = useParams();
    const song = (useSelector(state => state.songs[`${songId}`]));
    const dispatch = useDispatch();
    const history = useHistory();


    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (song) setIsLoaded(true);
    }, [song])

    const handleEdit = (songId) => {
        if (songId <= 12) songId = songId - 1;
        history.push(`/songs/${songId}/edit`);
    }

    const handleDelete = (songId) => {
        return dispatch(songActions.byeSong(songId))
            .then(() => {
                history.push("/songs");
            })
    }

    return isLoaded && (
        <>
            <div className="songCard-container">
                <div className="songCard-photo">
                    <img className="songCard-img" src={songCardPhoto} alt="default music"></img>
                </div>
                    <div className="songCard-title">
                        <h2>{song.title}</h2>
                    </div>
                    <div className="songCard-description">
                        <p>{song.description}</p>
                    </div>
                <button type="submit" className="songCard-edit" onClick={() => handleEdit(songId)}>
                    Edit Song
                </button>
                <button type="submit" className="songCard-delete" onClick={() => handleDelete(songId)}>
                    Delete Song
                </button>
            </div>
        </>
    )
}
