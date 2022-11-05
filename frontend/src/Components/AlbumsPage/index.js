import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import * as songActions from "../../store/songs";
import * as albumActions from "../../store/albums";
import albumPic from "../../images/album-pic.png";
import "./AlbumsPage.css";


export default function AlbumsPage() {
    const albums = Object.values(useSelector(state => state.albums));
    let { albumId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    if (!albumId) albumId = 0;

    useEffect(() => {
        dispatch(albumActions.returnAllAlbums());
    }, [dispatch])

    const handleAlbumCreatePage = () => {
        history.push("/albums/create");
    }

    const handleAlbumCardPage = (albumId) => {
        dispatch(albumActions.returnAlbum(albumId))
        history.push(`/albums/${albumId}`);
    }

    return (
        <section className="album-page-container">
            <div className="album-section">
                {albums && (albums.map(album => {
                    return (
                        <div className="album-row" key={album.id} onClick={() => handleAlbumCardPage(album.id)}>
                            {/* <img src={`${song.previewImage}`} alt={`${song.title}`}/> */}
                            <img className="album-image" src={albumPic} alt={`${album.title}`} />
                            <p>{album.title}</p>
                            <p>{album.description}</p>
                        </div>
                    )
                }))}
            </div>
                {/* add album */}
                <div className="add-album-container">
                    <button
                    className="album-nav-button"
                    onClick={handleAlbumCreatePage}>
                         + Add Album
                    </button>
                </div>
        </section>
    )
}
