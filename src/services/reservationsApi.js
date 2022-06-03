/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reservationsApi = createApi({
  reducerPath: 'reservations',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://sheltered-tor-84017.herokuapp.com/api/v2' }),
  tagTypes: ['Reservation'],
  auth: {
    token: localStorage.getItem('token'),
  },
  endpoints: (builder) => ({}),
});

export default reservationsApi;
