import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/songs";
// import * as albumActions from "../../store/albums";
import "./SongEditForm.css";

export default function SongEditForm() {

    // const songs = useSelector((state) => state.songs);
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    // const [albumId, setAlbumId] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleClick = () => {
        const song = { title, description, url, id: songId }
        dispatch(songActions.updateSong(song))
        history.push("/songs");
    }

    // const userAlbums =

    return (
        <>
            <div className="edit-content">
                <div className="edit-song-head">
                    <h2>Edit This Song</h2>
                </div>

                <form>
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
                    <button type="submit" className="submit-edit-button" onClick={() => handleClick(songId)}>Finish</button>
                </form>
            </div>
        </>
    )
}
