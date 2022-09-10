import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlists";
import "./PlaylistCreateForm.css";

export default function PlaylistCreateForm() {

    const currentUser = useSelector(state => state.session.user.id);
    // console.log("currentUser",currentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);

    const [errors, setErrors] = useState([]);

    // const setUser = (userId) => {
    //     const currentUserId = useSelector(state => state.session.user.id);
    //     userId = currentUser.id
    //     console.log("userId", userId);
    //     return userId;
    // }

    const handleSubmit = (e) => {
        const playlist = { name, userId }

        e.preventDefault();
        return dispatch(playlistActions.newPL(playlist))
            .then(() => {
                history.push("/playlists");
            })
    }

    return (
        <>
            <div className="form-content">
                <div className="create-song-head">
                    <h2>Create a Playlist</h2>
                </div>

                <form>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="playlist-name">
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" onClick={handleSubmit} value={userId} className="create-playlist-button">
                        Finish
                    </button>
                </form>
            </div>
        </>
    )
}

// value={userId}
//                             onChange={(e) => setUserId(e.target.value)}
//                             required

// onChange={() => (setUserId(currentUser.id))}
