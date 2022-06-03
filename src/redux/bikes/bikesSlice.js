/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

// axios.defaults.baseURL = 'https://sheltered-tor-84017.herokuapp.com';

export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const motor = await axios.get('https://sheltered-tor-84017.herokuapp.com/api/v2/scooters');
  return motor.data;
});

export const addBike = createAsyncThunk('bikes/addBike', async (body) => {
  const restructured = {
    description: body.bike.description,
    color: body.bike.color,
    title: body.bike.title,
    image: body.bike.image[0].name,
    model: body.bike.model,
    year: Number(body.bike.year),
  };

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: 'https://sheltered-tor-84017.herokuapp.com/api/v2/scooters/new',
    data: qs.stringify(restructured),
  };

  const response = await axios(options);
  return response.data;
});

export const deleteBike = createAsyncThunk('bikes/deleteBike', async (id) => {
  const options = {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    url: `https://sheltered-tor-84017.herokuapp.com/api/v2/scooters/${id}`,
  };

  const response = await axios(options);
  window.location.reload();
  return response.data;
});

export const bikesSlice = createSlice({
  name: 'bikes',
  initialState: {
    bikes: [],
  },
  reducers: {
    setBikes: (state, action) => ({
      // eslint-disable-next-line no-param-reassign
      // state.bikes = action.payload;
      ...state, bikes: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBikes.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    });
    builder.addCase(fetchBikes.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.bikes = action.payload;
    });
    builder.addCase(addBike.fulfilled, (state, action) => {
      state.bikes.push(action.payload);
    });
    builder.addCase(deleteBike.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.bikes = state.bikes.filter((bike) => bike.id !== action.payload);
    });
  },
});

export const { setBikes } = bikesSlice.actions;

export default bikesSlice.reducer;
