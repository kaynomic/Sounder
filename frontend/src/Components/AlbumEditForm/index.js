import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as albumActions from "../../store/albums";
import "./AlbumEditForm.css";

export default function AlbumEditForm() {

    const { albumId } = useParams();
    console.log("albumId", albumId);
    // const albums = useSelector(state => state.albums);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    // const [previewImage, setPreviewImage] = useState("");

    // useEffect(() => {
    //     dispatch(albumActions.returnAllAlbums())
    // }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/albums`);
    }

    const handleClick = () => {
        const album = { title, description, id: albumId }
        // console.log("albumId", albumId);
        dispatch(albumActions.albumEdit(album))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    // const handleSubmit = (e) => {
    //     const album = { title, description };

    //     e.preventDefault();
    //     return dispatch(albumActions.newAlbum(album))
    //         .then(async (res) => {
    //             if (res.ok) history.push("/albums");
    //         })
    // };


    return (
        <>
            <div className="edit-content">
                <div className="edit-album-head">
                    <h2>Edit This Album</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="albumEdit-title">
                        Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="albumEdit-description">
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    {/* <button type="submit" className="albumCard-addSong" onClick={() => handleAdd(albumId)}>Add Song To Album</button> */}
                    <button type="submit" className="submit-albumEdit-button" onClick={() => handleClick(albumId)}>Finish</button>
                </form>
            </div>
        </>
    )
}
