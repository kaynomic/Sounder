import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnAllSongs } from "../../store/songReducer";

export default function SongsPage() {
    const songs = Object.values(useSelector(state => state.songs));
    const dispatch = useDispatch();

    console.log(songs);

    useEffect(() => {
        dispatch(returnAllSongs())
    }, [dispatch])

    return (
        <>
            <div className="song-section">
                {songs && (songs.map(song => {
                    return (
                        <div className="song-row" key={song.id}>
                                <p>{song.title}</p>
                                <p>{song.description}</p>
                        </div>
                    )
                }))}
            </div>
        </>
    )
}
