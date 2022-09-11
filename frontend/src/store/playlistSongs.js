import { csrfFetch } from "./csrf";

const ADD_SONG = "playlistSongs/addSong";

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

export const addingSong = (playlistId, songId) => async (dispatch) => {
    // console.log("songId Thunk", songId);
    // console.log("songId Thunk typeof", typeof songId);
    // console.log("playlistId Thunk", playlistId);
    // console.log("playlistId Thunk typeof", typeof playlistId);

    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: "POST",
        body: JSON.stringify(songId)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addSong(data));
    }
}

let initialState = {};

export default function playSongReducer(state = initialState, action) {
    const newState = { ...state };

    switch(action.type) {
        case ADD_SONG:
            newState[action.song.playlistId] = { ...action.song.songId };
            return newState;
        default:
            return newState;
    }
}
