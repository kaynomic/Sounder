import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongCreateForm.css';
import * as songActions from "../../store/songs";
import * as albumActions from "../../store/albums";
import { useHistory, useParams } from "react-router-dom";

export default function SongCreateForm() {

  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  // const songs = useSelector((state) => state.songs);
  const albums = Object.values(useSelector(state => state.albums));
  const album = useSelector(state => state.albums.albumId);



  // console.log("albums edit", albums);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [alId, setAlbumId] = useState(null);
  // const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (album) setIsLoaded(true);
  }, [album])



  useEffect(() => {
    dispatch(albumActions.returnAllAlbums());
}, [dispatch])

  useEffect(() => {
    dispatch(albumActions.returnAlbum(albumId))
  }, [dispatch, albumId])

  const handleSubmit = (e) => {
    const song = { title, description, url, albumId };

    e.preventDefault();
    return dispatch(songActions.newSong({ song }))
      .then(async (res) => {
        if (res.ok) history.push("/songs");
      })
  };

  const userAlbums = albums.filter(album => {
    return album.userId === user.id
  })

  // console.log("userAlb", userAlbums)

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

          {/* { (albums.userId === user.id) &&
          <>
          <label htmlFor="albums-selector"></label>
          <select className="albums-selector">
            <option value=""> - Select an Album -
            </option>

            {userAlbums && userAlbums.map(album => {
              return (
                <option value={album.id} key={album.id} onChange={() => {setAlbumId(album.id)}}>{album.title}</option>
              )
            })}

          </select>
          </> } */}
          <button type="submit" className="create-button" onClick={() => setAlbumId(albumId)}>Finish</button>
        </form>
      </div>
    </>
  );
}
