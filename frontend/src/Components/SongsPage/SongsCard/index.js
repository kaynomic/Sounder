import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../../store/songs";

export default function SongsCard() {

      const songs = useSelector((state) => state.songs);

    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();

    const handleEdit = (e) => {
        e.preventDefault();

    }

    const handleDelete = (songId) => {
        return dispatch(songActions.byeSong(songId))
        .then(() => {
            history.push("/songs");
        })
    }

    return (
        <>
        <div className="songCard-container">
            <div className="songCard-photo">
                <img className="songCard-img" src={"https://i.pinimg.com/originals/66/64/3e/66643e3e7feea9b07d469b229c1b2722.jpg"} alt="default music photo"></img>
            </div>
            <div className="songCard-title">
                <h2>{songs.title}</h2>
            </div>
            <div className="songCard-description">
                <p>{songs.description}</p>
            </div>
            <button type="submit" className="songCard-edit" onSubmit={handleEdit}>
                Edit Song
            </button>
            <button type="submit" className="songCard-delete" onClick={() => handleDelete(songId)}>
                Delete Song
            </button>
        </div>
        </>
    )
}
