import { configureStore } from '@reduxjs/toolkit';
import bikesReducer from './bikes/bikesSlice';
import userReducer from './users/userSlice';

export default configureStore({
  reducer: {
    bikes: bikesReducer,
    user: userReducer,
  },
});
