import React, { useState, useEffect } from 'react';
import {
  AppBar, Backdrop, Container, CircularProgress, Grid, Modal, TextField, Toolbar, Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponseData, setApiResponseData] = useState(null);
  const [filteredDataElements, setfilteredDataElements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://www.cubyt.io/data/categories');
        setApiResponseData(response.data);
        setLoading(false);
        setApiError(false);
      } catch (err) {
        setLoading(false);
        setApiError(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function drawFilteredElements() {
      return apiResponseData.reduce((accumulator, info) => {
        if (searchField.length > 0) {
          const searchRegex = new RegExp(searchField, 'i');
          if (!searchRegex.test(info.category_name)
            && !searchRegex.test(info.display_name)
            && !searchRegex.test(info.description)) {
            return accumulator;
          }
        }

        accumulator.push(<ItemCard
          category_name={info.category_name}
          display_name={info.display_name}
          description={info.description}
          image_uri={info.image_uri}
          key={info.category_name}
        />);
        return accumulator;
      }, []);
    }

    if (apiResponseData && apiResponseData.length > 0) {
      setfilteredDataElements(drawFilteredElements());
    }
  }, [searchField, apiResponseData]);

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
      <Modal open={loading} closeAfterTransition>
        <Backdrop in={loading} open={loading} transitionDuration={300}>
          <CircularProgress aria-busy="true" size={100} />
        </Backdrop>
      </Modal>
      <Container>
        <TextField
          fullWidth
          margin="normal"
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          onChange={(e) => setSearchField(e.target.value)}
        />
      </Container>
      <Container>
        <Grid
          container
          justify="center"
          alignItems="stretch"
          spacing={1}
        >
          {apiError && <MuiAlert elevation={6} severity="error">Unable to fetch data, please try again later.</MuiAlert>}
          {filteredDataElements}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
