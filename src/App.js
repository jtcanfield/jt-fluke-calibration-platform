import React, { useState, useEffect } from 'react';
import {
  AppBar, Container, Grid, Toolbar, Typography,
} from '@material-ui/core';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://www.cubyt.io/data/categories');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Fluke
            </Typography>
          </Toolbar>
        </AppBar>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {data && data.map((info) => (
            <ItemCard
              category_name={info.category_name}
              display_name={info.display_name}
              description={info.description}
              image_uri={info.image_uri}
              key={info.category_name}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
