import Axios from 'axios';

// URLs
const BASE_URL = ''

// const
const FETCH_BIKES = 'BOOK-RIDE/BIKES/FETCH_BIKES';
const CREATE_BIKE = 'BOOK-RIDE/BIKES/CREATE_BIKE';
const DELETE_BIKE = 'BOOK-RIDE/BIKES/DELETE_BIKE';

const fetchBikes = (payload) => ({
  type: FETCH_BIKES,
  payload,
});

const createBike = (payload) => ({
  type: CREATE_BIKE,
  payload,
});

const deleteBike = (payload) => ({
  type: DELETE_BIKE,
  payload,
});

// state
const bikesState = [];

// APIs-functions
export const fetchBikesApi = (accessToken) => async (dispatch) => {
  const returnValue = await Axios.get(`${BASE_URL}/bikes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { bikes } = returnValue.data.data;
  dispatch(fetchBikes(bikes));
};

export const createBikeApi = (accessToken, data) => async (dispatch) => {
  await Axios.post(`${BASE_URL}/bikes`, data,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  dispatch(createBike(data));
};

export const deleteBikeApi = (accessToken, id) => async (dispatch) => {
  await Axios.delete(`${BASE_URL}/bikes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  dispatch(deleteBike(id));
};

// reducer
const reducer = (state = bikesState, action) => {
  switch (action.type) {
    case FETCH_BIKES:
      return action.payload;
    case CREATE_BIKE:
      return [...state, action.payload];
    case DELETE_BIKE:
      return state.filter((bike) => bike.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;