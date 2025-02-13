// Importer les composants nécessaires de react-admin
import { AuthProvider, HttpError } from "react-admin";
// Importer les données des utilisateurs depuis un fichier JSON
import data from "./users.json";


export const authProvider: AuthProvider = {
  // Fonction de connexion
  login: ({ username, password }) => {
    // Trouver l'utilisateur correspondant aux identifiants fournis
    const user = data.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      // Supprimer le mot de passe avant de stocker les informations de l'utilisateur
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      let { password, ...userToPersist } = user;
      localStorage.setItem("user", JSON.stringify(userToPersist));
      return Promise.resolve();
    }

    // Rejeter la promesse si les identifiants sont invalides
    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid username or password",
      }),
    );
  },
  // Fonction de déconnexion
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  // Vérifier les erreurs d'authentification
  checkError: () => Promise.resolve(),
  // Vérifier si l'utilisateur est authentifié
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  // Obtenir les permissions de l'utilisateur
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  // Obtenir l'identité de l'utilisateur
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;