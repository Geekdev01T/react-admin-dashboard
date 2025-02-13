// Importer les hooks useState et useEffect de React
import { useState, useEffect } from 'react';
// Importer les composants nécessaires de react-admin
import {
  Admin,
  EditGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
// Importer le composant Layout personnalisé
import { Layout } from "./Layout";
// Importer le fournisseur de données
import { dataProvider } from "./dataProvider";
// Importer le fournisseur d'authentification
import { authProvider } from "./authProvider";
// Importer les composants de gestion des utilisateurs
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { UserShow } from "./UserShow";
// Importer le composant Dashboard
import Dashboard from "./Dashboard";
// Importer les composants de gestion des publications
import { PostList } from "./PostList";
// Importer les thèmes clair et sombre
import { lightTheme, darkTheme } from './theme';
// Importer le composant de changement de thème
import ThemeSwitcher from './ThemeSwitcher';
// Importer le fournisseur de thème de MUI
import { ThemeProvider } from '@mui/material';
// Importer les composants de création d'utilisateur et de publication
import { UserCreate } from './UserCreate';
import { PostCreate } from './PostCreate';



// Afficher le dataProvider dans la console pour le débogage
// console.log(dataProvider)

// Définir le composant principal App
export const App = () => {
  // Définir l'état pour le thème sombre
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  // Fonction pour basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Utiliser useEffect pour sauvegarder le thème sélectionné dans le localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    // Fournir le thème sélectionné à l'application
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Admin
        layout={Layout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        customRoutes={[
          {
            name: 'theme-switcher',
            path: '/theme-switcher',
            component: () => <ThemeSwitcher toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />,
          },
        ]}
      >
        {/* Définir les ressources pour les utilisateurs et les publications */}
        <Resource name="users" list={UserList} create={UserCreate} show={UserShow} edit={UserEdit} recordRepresentation={'name'} />
        <Resource name="posts" list={PostList} show={ShowGuesser} create={PostCreate} edit={EditGuesser} />
      </Admin>
    </ThemeProvider>
  );
};