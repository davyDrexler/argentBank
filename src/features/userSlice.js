// src/features/userName.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to update user pseudo
export const updateUserPseudo = createAsyncThunk(
  'user/updateUserPseudo',
  async (newPseudo, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newPseudo }),
      });
      if (!response.ok) {
        throw new Error('Failed to update pseudo');
      }
      const data = await response.json();
      console.log('Updated pseudo:', data);
      return data.body;
    } catch (error) {
      console.error('Update pseudo error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pseudo: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPseudo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserPseudo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pseudo = action.payload.pseudo;
        console.log('New state:', state);
      })
      .addCase(updateUserPseudo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log('Update failed:', action.payload);
      });
  },
});

export default userSlice.reducer;
