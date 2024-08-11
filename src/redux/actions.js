import { login } from "./userSlice";

// Centralisation des URLs de l'API
const API_BASE_URL = "http://localhost:3001/api/v1/user";
const LOGIN_URL = `${API_BASE_URL}/login`;
const PROFILE_URL = `${API_BASE_URL}/profile`;

// Fonction utilitaire pour gérer les requêtes API
const apiFetch = async (url, options) => {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la requête vers ${url} : ${response.statusText}`
      );
    }
    return response.json();
  });
};

export const authenticateUser = (loginData, redirectTo, dispatch) => {
  apiFetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((responseData) => {
      const token = responseData.body.token;
      if (!token) {
        throw new Error("Token non présent dans la réponse");
      }
      fetchUserProfile(token, redirectTo, dispatch);
    })
    .catch((error) => {
      console.error("Erreur lors de la tentative de connexion :", error);
      alert("Une erreur est survenue lors de la tentative de connexion.");
    });
};

export const fetchUserProfile = (token, redirectTo, dispatch) => {
  apiFetch(PROFILE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: null,
  })
    .then((userData) => {
      dispatch(login({ ...userData.body, token }));
      localStorage.setItem("token", token); // Stocke le token dans localStorage pour une connexion persistante

      redirectTo("/profile");
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du profil :", error);
      alert("Une erreur est survenue lors de la récupération du profil.");
    });
};

// Fonction pour restaurer l'état lors du chargement de l'application
export const restoreSession = (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchUserProfile(token, () => {}, dispatch);
  }
};
