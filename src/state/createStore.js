import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '.';

const initialState = {};
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

export default preloadedState =>
  createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)), preloadedState);
