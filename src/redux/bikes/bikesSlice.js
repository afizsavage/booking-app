/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://sheltered-tor-84017.herokuapp.com';

export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const motor = await axios.get('/api/v2/motorcyles');
  return motor.data;
});

export const addBike = createAsyncThunk('bikes/addBike', async (body) => {
  const res = await fetch('https://sheltered-tor-84017.herokuapp.com/api/v2/motorcyles/new', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
});

export const deleteBike = createAsyncThunk('bikes/deleteBike', async (id) => {
  const res = await fetch(`https://sheltered-tor-84017.herokuapp.com/api/v2/motorcyles/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.join();

  return Number(data);
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
