import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./userSlice";

// Centralisation des URLs de l'API
const API_BASE_URL = "http://localhost:3001/api/v1/user";
const LOGIN_URL = `${API_BASE_URL}/login`;
const PROFILE_URL = `${API_BASE_URL}/profile`;

// Fonction utilitaire pour gérer les requêtes API
const apiFetch = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Erreur lors de la requête vers ${url} : ${response.statusText}`
    );
  }
  return response.json();
};

// Créer une action asynchrone pour l'authentification
export const authenticateUser = createAsyncThunk(
  "user/authenticate",
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      const responseData = await apiFetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const token = responseData.body.token;
      if (!token) {
        throw new Error("Token non présent dans la réponse");
      }

      // Récupération du profil utilisateur
      const userData = await apiFetch(PROFILE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      // Enregistrer les informations utilisateur dans le store Redux
      dispatch(login({ ...userData.body, token }));
      localStorage.setItem("token", token);

      return userData.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Créer une action asynchrone pour mettre à jour le nom d'utilisateur
export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async (newUserName, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.token;

    try {
      const data = await apiFetch(PROFILE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });

      // Vérifier si l'API a retourné une erreur
      if (data.error) {
        throw new Error(data.error.message || "Failed to update user name");
      }

      return data.body.userName;
    } catch (error) {
      console.error("Error in updateUserName:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Créer une action asynchrone pour restaurer la session utilisateur
export const restoreSession = createAsyncThunk(
  "user/restoreSession",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = await apiFetch(PROFILE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        dispatch(login({ ...userData.body, token }));
        return userData.body;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
