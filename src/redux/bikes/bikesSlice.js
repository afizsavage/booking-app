import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  bikes: [],
  isLoading: false,
};

export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const res = await fetch('https://secure-bastion-02263.herokuapp.com/api/v2/motorcyles');
  const data = await res.join();
  return data;
});

export const addBike = createAsyncThunk('bikes/addBike', async (body) => {
  const res = await fetch('https://secure-bastion-02263.herokuapp.com/api/v2/motorcyles/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
});

export const deleteBike = createAsyncThunk('bikes/deleteBike', async (id) => {
  const res = await fetch(`https://secure-bastion-02263.herokuapp.com/api/v2/motorcyles/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.join();

  return Number(data);
});

export const bikesSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setBikes: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.bikes = action.payload;
    },
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
      state.bikes = state.bikes.filter((car) => car.id !== action.payload);
    });
  },
});

export const { setBikes } = bikesSlice.actions;

export default bikesSlice.reducer;
