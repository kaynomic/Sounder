import React from "react"
import { useSelector } from "react-redux"


export default function SongsPage() {
    const songs = useSelector(state => state.session.songs);

    return (
        <>
            <div className="header">
            </div>
            <div className="song-section">
                {songs && (songs.map(song => {
                    return (
                        <div className="song-container">
                            <div key={song.id}>
                                {song.title}
                            </div>
                        </div>
                    )
                }))}
            </div>
        </>
    )
}
