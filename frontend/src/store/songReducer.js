// import { useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

const CREATE_SONG = "song/createSong";
const GET_SONG = "song/getSong";
const ALL_SONGS = "song/allSongs";
const EDIT_SONG = "song/editSong";
const DELETE_SONG = "song/deleteSong";

// CREATE
const createSong = (song) => {
    return {
        type: CREATE_SONG,
        song
    }
}

export const newSong = (song) => async (dispatch) => {
    const { title, description, url, previewImage } = song;

    const track = await csrfFetch('/songs', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            title,
            description,
            url,
            previewImage
        }
    })

    const songData = await track.json();
    dispatch(createSong(songData));
}

// GET
const getSong = (song) => {
    return {
        type: GET_SONG,
        song
    }
}

export const returnSong = (songId) => async (dispatch) => {
    const song = await csrfFetch(`/songs/${songId}`);

    if (song.ok) {
        const data = await song.json();
        dispatch(getSong(data));
    }
}

// ALL
const allSongs = (songs) => {
    return {
        type: ALL_SONGS,
        songs
    }
}

export const returnAllSongs = () => async (dispatch) => {
    const songs = await csrfFetch("/songs");

    if (songs.ok) {
        const data = await songs.json();
        dispatch(allSongs(data.Songs))
    }
}

// UPDATE
const editSong = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

export const updateSong = (songDetails) => async (dispatch) => {
    const song = await csrfFetch(`/songs/${songDetails.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songDetails)
    })

    if (song.ok) {
        const data = await song.json();
        dispatch(editSong(data));
    }
}

// DELETE
const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

export const byeSong = (songId) => async (dispatch) => {
    const song = await csrfFetch(`/songs/${songId}`, {
        method: "DELETE"
    });

    if (song.ok) {
        dispatch(deleteSong(songId));
    }
}





let initialState = {};

export default function songReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case CREATE_SONG:
            return newState;
        case GET_SONG:
            return newState;
        case ALL_SONGS:
            action.songs.forEach((song) => {
                // console.log(song)
                newState[song.id] = song;
            })
            // console.log(newState);
            return newState;
        case EDIT_SONG:
            return newState;
        case DELETE_SONG:
            delete newState[action.id]
            return newState;
        default:
            return newState;
    }
}
