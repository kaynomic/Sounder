import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/songs";

export default function SongEditForm() {

    const songs = useSelector((state) => state.songs);
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const handleClick = () => {
        const song = { title, description, url }
        return dispatch(songActions.updateSong({ song, id: songId }))
        .then(async (res) => {
            if (res.ok) history.push("/songs");
        })
    }

    return (
        <>
            <div className="edit-content">
                <div className="edit-song-head">
                    <h2>Edit This Song</h2>
                </div>

                <form onClick={() => handleClick(songId)}>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="edit-title">
                        Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="edit-description">
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label className="edit-url">
                        URL
                        <input
                            type="text"
                            className='url-input'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-edit-button">Finish</button>
                </form>
            </div>
        </>
    )
}
