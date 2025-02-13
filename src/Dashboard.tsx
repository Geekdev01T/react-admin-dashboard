// Importer les bibliothèques et composants nécessaires
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './dash.css';

// Définir le composant Dashboard
const Dashboard: React.FC = () => {
  const dataProvider = useDataProvider();
  const [userCount, setUserCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [postsByUser, setPostsByUser] = useState<any[]>([]);
  const [postStatus, setPostStatus] = useState<any[]>([]);

  // Récupérer les données de l'API lorsque le composant est monté
  useEffect(() => {
    // Récupérer le nombre total d'utilisateurs
    dataProvider.getList('users', {
      pagination: { page: 1, perPage: 1 }
    }).then(response => {
      setUserCount(response.total);
    });

    // Récupérer le nombre total de publications
    dataProvider.getList('posts', {
      pagination: { page: 1, perPage: 1 }
    }).then(response => {
      setPostCount(response.total);
    });

    // Récupérer les publications et les regrouper par utilisateur et par statut
    dataProvider.getList('posts', {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'userId', order: 'ASC' }
    }).then(response => {
      // Regrouper les publications par utilisateur
      const postsByUser = response.data.reduce((acc: any, post: any) => {
        acc[post.userId] = (acc[post.userId] || 0) + 1;
        return acc;
      }, {});
      setPostsByUser(Object.keys(postsByUser).map(userId => ({ userId, count: postsByUser[userId] })));

      // Regrouper les publications par statut
      const postStatus = response.data.reduce((acc: any, post: any) => {
        acc[post.status] = (acc[post.status] || 0) + 1;
        return acc;
      }, {});
      setPostStatus(Object.keys(postStatus).map(status => ({ name: status, value: postStatus[status] })));
    });
  }, [dataProvider]);

  // Définir les couleurs pour le graphique en secteurs
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Card className="dash-container">
      <CardContent>
        <Typography className='dash-title'>
          Dashboard
        </Typography>
        <div className='dash-content'>
          <div className='dash-card'>
            <p className='dash-card-text'>Nombre total d'utilisateurs: </p> <span className='dash-card-count'>{userCount}</span>
          </div>
          <div className='dash-card'>
            <p className='dash-card-text'>Nombre total de publications:</p> <span className='dash-card-count'>{postCount}</span>
          </div>
        </div>
        <div className='dash-charts'>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={postsByUser}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={postStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {postStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;