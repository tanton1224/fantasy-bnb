import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import spotsReducer from './spots';
import imagesReducer from './images';
import selectedSpotReducer from './selectedSpot';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  images: imagesReducer,
  selectedSpot: selectedSpotReducer,
  reviews: reviewsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
