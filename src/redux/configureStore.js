import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import bikesReducer from './bikes/bikesSlice';
import userReducer from './users/userSlice';
import reservationsApi from '../services/reservationsApi';

export default configureStore({
  reducer: {
    [reservationsApi.reducerPath]: reservationsApi.reducer,
    bikes: bikesReducer,
    user: userReducer,
  },
  // middleware: [thunk, logger],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(reservationsApi.middleware, thunk, logger),
});
