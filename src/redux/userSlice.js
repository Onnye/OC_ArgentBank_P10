import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "./actions";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
  token: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    logout: () => {
      localStorage.removeItem("token"); // Supprimer le token du localStorage
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
