// import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";

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

    const data = await track.json();
    dispatch(createSong(data));
}

// GET
const getSong = (song) => {
    return {
        type: GET_SONG,
        song
    }
}

// ALL
const allSongs = (songs) => {
    return {
        type: ALL_SONGS,
        songs
    }
}

// UPDATE
const editSong = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

// DELETE
const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
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
            return newState;
        case EDIT_SONG:
            return newState;
        case DELETE_SONG:
            return newState;
        default:
            return newState;
    }
}
