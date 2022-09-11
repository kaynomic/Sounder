import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './AlbumCreateForm.css';
import * as albumActions from "../../store/albums";
import { useHistory } from "react-router-dom";

export default function AlbumCreateForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        const album = { title, description };

        e.preventDefault();
        return dispatch(albumActions.newAlbum(album))
            .then(async (res) => {
                if (res.ok) history.push("/albums");
            })
    };

    return (
        <>
            <div className="form-content">
                <div className="create-album-head">
                    <h2>Create an Album</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="album-title">
                        Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="album-description">
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="albumCreate-button">Finish</button>
                </form>
            </div>
        </>
    );
}
