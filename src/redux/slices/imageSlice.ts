import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ImageState {
  images: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
};

export const fetchSliderImages = createAsyncThunk<string[], void>(
  'images/fetchSliderImages',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/images/getSliderImages`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch images: ${errorMessage}`);
    }
    return response.json();
  },
);

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSliderImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchSliderImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch slider images';
      });
  },
});

export default imageSlice.reducer;
