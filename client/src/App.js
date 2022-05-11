import React from 'react'
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@sproutsocial/racine';

// Components
import { NavBar } from "./components";

// Pages
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";


const App = (props) => {
  return (

    <ThemeProvider>
      <div className="App">
        <NavBar />
        <div className="wrapper">
          <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />º
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App