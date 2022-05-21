import React from 'react'
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@sproutsocial/racine';
import { AuthProvider } from './contexts/AuthContext'

// Components
import { NavBar } from "./components";

// Pages
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import PersonDataPage from "./pages/PersonDataPage";


const App = (props) => {
  return (

    <ThemeProvider>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/migrante/:id" element={<PersonDataPage />} />
              <Route path="/login" element={<LoginPage />} />º
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </ThemeProvider>
  )
}

export default App