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
import AddUserPage from "./pages/AddUserPage";


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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/users/add" element={<AddUserPage />} />
              <Route path="/users" element={<LoginPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </ThemeProvider>
  )
}

export default App