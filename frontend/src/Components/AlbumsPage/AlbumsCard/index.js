import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as albumActions from "../../../store/albums";
import albumPic from "../../../images/album-pic.png";
import "./AlbumsCard.css";

export default function AlbumsCard() {

    const { albumId } = useParams();
    const user = useSelector(state => state.session.user);
    const album = (useSelector(state => state.albums[`${albumId}`]));
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (album) setIsLoaded(true);
    }, [album])

    const handleEdit = (albumId) => {
        // if (songId <= 12) songId = songId - 1;
        history.push(`/albums/${albumId}/edit`);
    }

    const handleDelete = (albumId) => {
        dispatch(albumActions.byeAlbum(albumId))
        .then(() => {
            history.push("/albums");
        })
    }

    return isLoaded && (
        <>
            <div className="albumCard-container">
                <div className="albumCard-photo">
                    <img className="albumCard-img" src={albumPic} alt="default music"></img>
                </div>
                <div className="albumCard-title">
                    <h2>{album.title}</h2>
                </div>
                <div className="albumCard-description">
                    <p>{album.description}</p>
                </div>
                {album.userId === user.id && <> <button type="submit" className="albumCard-edit" onClick={() => handleEdit(albumId)}>
                    Edit Album
                </button>
                    <button type="submit" className="albumCard-delete" onClick={() => handleDelete(albumId)}>
                        Delete Album
                    </button> </>}
            </div>
        </>
    )
}
