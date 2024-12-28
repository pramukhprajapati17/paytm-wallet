import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/theme.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Nav from './components/Nav';
import React from 'react';
import Dashboard from './pages/Dashboard';
function App() {

  return (
      <div>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
      
  )
}

export default App;
