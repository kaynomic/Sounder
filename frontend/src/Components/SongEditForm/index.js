import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/songs";
// import * as albumActions from "../../store/albums";
import "./SongEditForm.css";

export default function SongEditForm() {

    const user = useSelector(state => state.session.user);
    // const songs = useSelector((state) => state.songs);
    const myAlbums = [];
    const albums = Object.values(useSelector(state => state.albums));
    albums.forEach((album) => {
        if (album.userId === user.id) myAlbums.push(album)
    })

    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [selAlbumId, setSelAlbumId] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleClick = () => {
        const song = { title, description, url, id: songId, albumId: selAlbumId }
        dispatch(songActions.updateSong(song))
        history.push("/songs");
    }

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

                    {myAlbums.map((album) => (
                      <label key={album.id}>
                      Select Album
                      <input
                          type="button"
                          className='selAlbum-input'
                          value={album.id}
                          onClick={(e) => setSelAlbumId(e.target.value)}
                          required
                      ></input>
                      {album.title}
                  </label>  
                    ))}
                    
                    <button type="submit" className="submit-edit-button" onClick={() => handleClick(songId)}>Finish</button>
                </form>
            </div>
        </>
    )
}
