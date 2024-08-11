import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
  token: null,
};

// Fonction utilitaire pour mettre à jour les informations utilisateur
const setUserInfo = (state, action) => {
  state.email = action.payload.email;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
  state.userName = action.payload.userName;
  state.token = action.payload.token;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      setUserInfo(state, action);
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
