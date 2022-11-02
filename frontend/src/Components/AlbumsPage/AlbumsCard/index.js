import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as albumActions from "../../../store/albums";
import albumPic from "../../../images/album-pic.png";
import "./AlbumsCard.css";

export default function AlbumsCard() {

    const { albumId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const songs = Object.values(useSelector(state => state.songs));
    const albums = useSelector(state => state.albums);
    const album = (useSelector(state => state.albums[`${albumId}`]));
    // console.log("album", album)
    // const albumSongs = dispatch(useSelector(state => state.albums[`${albumId}`].then(values => {
    //     values.Songs.map(song => song.dataValues)
    // })));
    const albumSongs = songs.filter(song => {
        return song.albumId === album.id
    })

    // console.log("albumSongs", albumSongs);



    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (album) setIsLoaded(true);
    }, [album])

    useEffect(() => {
        dispatch(albumActions.returnAlbum(albumId));
    }, [dispatch, albumId])

    const handleAdd = (albumId) => {
        history.push(`albums/${albumId}/songs/create/`);
    }

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
                <div className="album-songs-head">
                    Album Songs:
                </div>
                { albumSongs && albumSongs.map(song => {
                    return (
                        <>
                            <div className="album-songs">
                                <ol key={song}>
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
                <button type="submit" className="albumCard-addSong" onClick={() => handleAdd(albumId)}>Add Song To Album</button>
                <button type="submit" className="albumCard-edit" onClick={() => handleEdit(albumId)}>
                    Edit Album
                </button>
                    <button type="submit" className="albumCard-delete" onClick={() => handleDelete(albumId)}>
                        Delete Album
                    </button> </>}
            </div>
        </>
    )
}
