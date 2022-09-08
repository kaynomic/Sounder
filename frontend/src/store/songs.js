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
    const { title, description, url } = song;

    const res = await csrfFetch("/songs", {
        method: "POST",
        body: JSON.stringify(song),
    })

    if (res.ok) {
        const newTrack = await res.json();
        dispatch(createSong(newTrack));
        return res;
    }
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


// export const getSongById = songId => state => Object.values(state.songs.Songs).find(song => song.id === Number(songId));


let initialState = {};

export default function songReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case CREATE_SONG:
            newState[action.song.id] = action.song;
            return newState;
        case GET_SONG:
            newState[action.song.id] = action.song;
            return newState;
        case ALL_SONGS:
            action.songs.forEach((song) => {
                newState[song.id] = song;
            })
            return newState;
        case EDIT_SONG:
            return newState;
        case DELETE_SONG:
            delete newState[action.songId]
            return newState;
        default:
            return newState;
    }
}
