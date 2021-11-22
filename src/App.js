import './App.css';
import Navbar from './components/Navbar';
import Poster from './components/Poster';
import React from 'react';

import Movies from './components/Movies';

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Poster/>
   <Movies/>
    </React.Fragment>
  );
}

export default App;
