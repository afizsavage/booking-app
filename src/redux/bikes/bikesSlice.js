/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const motor = await axios.get(
    'https://sheltered-tor-84017.herokuapp.com/api/v2/scooters',
  );
  return motor.data;
});

export const addBike = createAsyncThunk('bikes/addBike', async (body) => {
  const formData = new FormData();
  formData.append('description', body.bike.description);
  formData.append('color', body.bike.color);
  formData.append('title', body.bike.title);
  formData.append('image', body.bike.image[0]);
  formData.append('model', body.bike.model);
  formData.append('year', Number(body.bike.year));

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: 'https://sheltered-tor-84017.herokuapp.com/api/v2/scooters/new',
    data: formData,
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
      ...state,
      bikes: action.payload,
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
