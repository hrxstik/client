import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (propertyType?: string) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getBookings`, {
      params: { propertyType },
    });
    return response.data;
  },
);

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id: number) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/bookings/${id}`);
  return id;
});

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (
    {
      propertyId,
      dates,
      phone,
      startTime,
      endTime,
    }: { propertyId: number; dates: any; phone: string; startTime: string; endTime: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/book`, {
        propertyId,
        dates,
        phone,
        startTime,
        endTime,
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchOccupiedDates = createAsyncThunk(
  'bookings/fetchOccupiedDates',
  async (propertyId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/occupied-dates/${propertyId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

interface BookingState {
  bookings: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedFilter: string;
  occupiedDates: Date[];
}

const initialState: BookingState = {
  bookings: [],
  status: 'idle',
  error: null,
  selectedFilter: '',
  occupiedDates: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearFilter(state) {
      state.selectedFilter = '';
    },
    setFilter(state, action) {
      state.selectedFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      })
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as any)?.message || 'Ошибка при бронировании.';
      })
      .addCase(fetchOccupiedDates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOccupiedDates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.occupiedDates = action.payload;
      })
      .addCase(fetchOccupiedDates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка при получении бронирований.';
      });
  },
});

export const { clearFilter, setFilter } = bookingsSlice.actions;

export default bookingsSlice.reducer;
