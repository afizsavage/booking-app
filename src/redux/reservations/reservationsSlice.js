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
      query: () => '/available_motorcycles', // change endpoint to scooters when database is updated
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
      query: (id) => `/reserve_motorcycle/:id/${id}`, // change endpoint to scooters when database is updated
      transformResponse: (responseData) => {
        const loadedScooter = responseData.map((scooter) => {
          if (!scooter?.country) scooter.country = 'N/A';
          if (!scooter?.make) scooter.make = 'N/A';

          return scooter;
        });

        return reservationsAdapter.setAll(
          initialState,
          loadedScooter,
        ); /* normalize data
        (entity object with a bunch of objects in it.
          we use that ids array to look up the objects in the state) */
      },
      // add providesTags when needed
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetAvailableScotersQuery, useGetReservationQuery } = extendedReservationsSlice;

// returns the query result object
export const selectAvailableScootersResult = extendedReservationsSlice
  .endpoints.getAvailableScoters.select();

export const selectReservationResult = extendedReservationsSlice
  .endpoints.getReservation.select();

//  Create memoized selector
export const selectAvailableScootersData = createSelector(
  [selectAvailableScootersResult],
  (result) => result.data, // Normalized state with ids and entities
);

export const selectReservationData = createSelector(
  [selectReservationResult],
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

export default extendedReservationsSlice;
