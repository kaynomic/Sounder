import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SongCreateForm.css';
import * as songActions from "../../store/songs";
import { useHistory } from "react-router-dom";

export default function SongCreateForm() {
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state.songs);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  // const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    const song = { title, description, url };

    e.preventDefault();
    return dispatch(songActions.newSong({ song }))
      .then(async (res) => {
        if (res.ok) history.push("/songs");
      })
  };

  return (
    <>
      <div className="form-content">
        <div className="create-song-head">
          <h2>Create a Song</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
          <label className="song-title">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="song-description">
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="song-url">
            URL
            <input
              type="text"
              className='url-input'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="create-button">Finish</button>
        </form>
      </div>
    </>
  );
}
