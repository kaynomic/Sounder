import { csrfFetch } from "./csrf";

const CREATE_ALBUM = "album/createAlbum";
const GET_ALBUM = "album/getAlbum";
const ALL_ALBUMS = "album/allAlbums";
const EDIT_ALBUM = "album/editAlbum";
const DELETE_ALBUM = "album/deleteAlbum";

// CREATE
const createAlbum = (album) => {
    return {
        type: CREATE_ALBUM,
        album
    }
}

export const newAlbum = (album) => async (dispatch) => {
    const res = await csrfFetch("/api/albums", {
        method: "POST",
        body: JSON.stringify(album)
    })

    if (res.ok) {
        const newNew = await res.json();
        // console.log("newNew", newNew);
        dispatch(createAlbum(newNew));
        return res;
    }
}

// GET
const getAlbum = (album) => {
    return {
        type: GET_ALBUM,
        album
    }
}

export const returnAlbum = (albumId) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const data = res.json();
        dispatch(getAlbum(data));
    }
}

// ALL
const getAllAlbums = (albums) => {
    return {
        type: ALL_ALBUMS,
        albums
    }
}

export const returnAllAlbums = () => async (dispatch) => {
    const res = await csrfFetch("/api/albums");

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllAlbums(data))
    }
}

// UPDATE
const editAlbum = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    }
}

export const albumEdit = (albumDetails) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumDetails.id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumDetails)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(editAlbum(data));
    }
}

// DELETE
const deleteAlbum = (albumId) => {
    return {
        type: DELETE_ALBUM,
        albumId
    }
}

export const byeAlbum = (albumId) => async (dispatch) => {
    const album = await csrfFetch(`/api/albums/${albumId}`, {
        method: "DELETE"
    })

    if (album.ok) {
        dispatch(deleteAlbum(albumId))
    }
}

// REDUCER

let initialState = {};

export default function albumReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case CREATE_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case GET_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case ALL_ALBUMS:
            const delState = {}
            action.albums.forEach((album) => {
                delState[album.id] = album;
            })
            return delState;
        case EDIT_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case DELETE_ALBUM:
            delete newState[action.songId];
            return newState;
        default:
            return newState;
    }
}
