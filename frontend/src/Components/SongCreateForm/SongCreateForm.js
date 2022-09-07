import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import './SongCreateForm.css';
import * as songActions from "../../store/songs";
import { Redirect, useHistory } from "react-router-dom";

function SignupFormPage() {
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
    return dispatch(songActions.newSong({song}))
    .then(async (res) => {
      if (res.ok) history.push("/songs");
    })
  };

  return (
  <>
    <div className="create-song-head">
      <h2>Create a Song</h2>
    </div>

    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
      <label className="title">
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="description">
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="url">
        URL
        <input
          type="text"
          className='url-input'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      {/* <select className="album-selector" onChange={(e) => setAlbum(e.target.value)}
          required>
        Album
        <option>Dropout Boogie</option>
        <option></option>
        <option></option>
        <option></option>
        <option></option>
      </select> */}
      <button type="submit" className="create-button">Finish</button>
    </form>
  </>
  );
}

export default SignupFormPage;
