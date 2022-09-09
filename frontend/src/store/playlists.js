import { csrfFetch } from "./csrf";

const CREATE_PL = "playlist/createPL";
const GET_PL = "playlist/getPL";
const ALL_PL = "playlist/allPL";
const DELETE_PL = "playlist/deletePL";

// CREATE

const createPL = (playlist) => {
    return {
        type: CREATE_PL,
        playlist
    }
}

export const newPL = (playlist) => async (dispatch) => {
    const res = await csrfFetch("/playlists", {
        method: "POST",
        body: JSON.stringify(playlist),
    })

    if (res.ok) {
        const newList = await res.json();
        dispatch(createPL(newList));
        return res;
    }
}

// GET

const getPL = (playlist) => {
    return {
        type: GET_PL,
        playlist
    }
}

export const returnPL = (playlistId) => async (dispatch) => {
    const playlist = await csrfFetch(`/playlists/${playlistId}`);

    if (playlist.ok) {
        const data = await playlist.json();
        dispatch(getPL(data));
    }
}

// ALL

const allPL = (playlists) => {
    return {
        type: ALL_PL,
        playlists
    }
}

export const returnAllPLs = () => async (dispatch) => {
    const playlists = await csrfFetch("/playlists");

    if (playlists.ok) {
        const data = await playlists.json();
        dispatch(allPL(data.Playlists));
    }
}

// DELETE

const deletePL = (playlistId) => {
    return {
        type: DELETE_PL,
        playlistId
    }
}

export const byePL = (playlistId) => async (dispatch) => {
    const list = await csrfFetch(`/playlists/${playlistId}`, {
        method: "DELETE"
    })

    if (list.ok) {
        dispatch(deletePL(playlistId));
    }
}

// REDUCER

let initialState = {};

export default function playReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {
        case CREATE_PL:
            newState[action.playlist.id] = action.playlist;
            return newState;
        case GET_PL:
            newState[action.playlist.id] = action.playlist;
            return newState;
        case ALL_PL:
            action.playlists.forEach((playlist) => {
                newState[playlist.dataValues.id] = playlist;
            })
            return newState;
        case DELETE_PL:
            delete newState[action.playlistId];
            return newState;
        default:
            return newState;
    }
}
