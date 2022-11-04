import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as albumActions from "../../../store/albums";
import albumPic from "../../../images/album-pic.png";
import "./AlbumsCard.css";
import AlbumEditModal from "../../AlbumEditModal";

export default function AlbumsCard() {

    const { albumId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const songs = Object.values(useSelector(state => state.songs));
    // const albums = useSelector(state => state.albums);
    const album = (useSelector(state => state.albums[`${albumId}`]));

    const showSongs = [];

    const albumSongs = songs.filter(song => {
            console.log(song.albumId)
            console.log("feafe", albumId)
        if (song.albumId == albumId) {
            
            showSongs.push(song)
        }
        
        return showSongs;
    })

    console.log("show", showSongs)

    console.log("adaf", albumSongs);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (album) setIsLoaded(true);
    }, [album])

    useEffect(() => {
        dispatch(albumActions.returnAlbum(albumId));
    }, [dispatch, albumId])

    // const handleEdit = (albumId) => {
    //     // if (songId <= 12) songId = songId - 1;
    //     // history.push(`/albums/${albumId}/edit`);
    //     // <AlbumEditModal />
    // }

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
                <div className="album-songs-head">
                    Album Songs:
                </div>
                { showSongs && showSongs.map(song => {
                    return (
                        <>
                            <div className="album-songs">
                                <ol key={song.id}>
                                    {song.title}
                                </ol>
                            </div>
                        </>
                    )
                })}
                <div className="albumCard-songs">
                </div>
                {album.userId === user.id &&
                <>
                <button type="submit" className="albumCard-edit">
                    <AlbumEditModal />
                </button>
                    <button type="submit" className="albumCard-delete" onClick={() => handleDelete(albumId)}>
                        Delete Album
                    </button> </>}
            </div>
        </>
    )
}
