import './App.css';
import Navbar from './components/Navbar';
import Poster from './components/Poster';
import React from 'react';
import Favorite from './components/Favorite'
import Movies from './components/Movies';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom';

function App() {
  return (
   <Router>
    <Navbar/>
    {/* <Poster/>
    <Movies/> */}
   <Routes>
    <Route exact path="/"  element={<><Poster/><Movies/></>}/>
    <Route path="/favorite" element={<Favorite/>}/>
   </Routes>
  </Router>

  )
}

export default App;
