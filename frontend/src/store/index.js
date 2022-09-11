import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumReducer from './albums';
import playReducer from './playlists';
import playSongReducer from './playlistSongs';
import sessionReducer from './session';
import songReducer from './songs';


const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songReducer,
  albums: albumReducer,
  playlists: playReducer,
  playlistSongs: playSongReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;
