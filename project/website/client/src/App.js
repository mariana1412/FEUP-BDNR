import React, { useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/example/`).then(({ data }) => {
      console.log(data);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
