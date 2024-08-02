// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pseudo: '',
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.pseudo = '';
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPseudo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserPseudo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pseudo = action.payload.userName;
        state.isAuthenticated = true;
      })
      .addCase(updateUserPseudo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setAuthenticated, logout } = userSlice.actions;

export default userSlice.reducer;
