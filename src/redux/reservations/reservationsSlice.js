/* eslint-disable no-param-reassign */
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import reservationsApi from '../../services/reservationsApi';

const reservationsAdapter = createEntityAdapter({
  selectId: (reservation) => reservation.id,
  // sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = reservationsAdapter.getInitialState();

const extendedReservationsSlice = reservationsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableScoters: builder.query({
      query: () => '/available_scooters', // change endpoint to scooters when database is updated
      transformResponse: (responseData) => {
        const loadedScooters = responseData.map((scooter) => {
          if (!scooter?.country) scooter.country = 'N/A';
          if (!scooter?.make) scooter.make = 'N/A';

          return scooter;
        });

        return reservationsAdapter.setAll(
          initialState,
          loadedScooters,
        ); /* normalize data
        (entity object with a bunch of objects in it.
          we use that ids array to look up the objects in the state) */
      },
      // add providesTags when needed
    }),
    getReservation: builder.query({
      query: (id) => `/scooters/${id}`, // change endpoint to scooters when database is updated
      return: (responseData) => {
        const loadedScooter = responseData;

        return reservationsAdapter.upsertOne(
          initialState,
          loadedScooter,
        ); /* normalize data
        (entity object with a bunch of objects in it.
          we use that ids array to look up the objects in the state) */
      },
      // add providesTags when needed
    }),
    getMyReservations: builder.query({
      // query with bearer token
      query: () => '/my_reservations', // change endpoint to scooters when database is updated
      return: (responseData) => {
        const loadedReservations = responseData;

        return reservationsAdapter.upsertMany(
          initialState,
          loadedReservations,
        ); /* normalize data
        (entity object with a bunch of objects in it.
          we use that ids array to look up the objects in the state) */
      },
      // add providesTags when needed
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const {
  useGetAvailableScotersQuery, useGetReservationQuery, useGetMyReservationsQuery,
} = extendedReservationsSlice;

// returns the query result object
export const selectAvailableScootersResult = extendedReservationsSlice
  .endpoints.getAvailableScoters.select();

export const selectReservationResult = extendedReservationsSlice
  .endpoints.getReservation.select();

export const selectMyReservationsResult = extendedReservationsSlice
  .endpoints.getMyReservations.select();

//  Create memoized selector
export const selectAvailableScootersData = createSelector(
  [selectAvailableScootersResult],
  (result) => result.data, // Normalized state with ids and entities
);

export const selectReservationData = createSelector(
  [selectReservationResult],
  (result) => result.data, // Normalized state with ids and entities
);

export const selectMyReservationsData = createSelector(
  [selectMyReservationsResult],
  (result) => result.data, // Normalized state with ids and entities
);

// Get selectors and rename them
export const {
  selectAll: selectAllAvailableScooters,
  selectById: selectAvailableScooterById,
  selectIds: selectAvailableScooterIds,
} = reservationsAdapter.getSelectors((state) => selectAvailableScootersData(state) ?? initialState);

export const {
  selectAll: selectAllReservation,
  selectById: selectReservationById,
} = reservationsAdapter.getSelectors((state) => selectReservationData(state) ?? initialState);

export const {
  selectAll: selectAllMyReservations,
  selectById: selectMyReservationById,
  selectIds: selectMyReservationIds,
} = reservationsAdapter.getSelectors((state) => selectMyReservationsData(state) ?? initialState);

export default extendedReservationsSlice;
