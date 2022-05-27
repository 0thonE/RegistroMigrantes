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
import UsersPage from "./pages/UsersPage";


const App = (props) => {
  return (

    <ThemeProvider>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <div className="wrapper">
            <Routes>
              <Route exact path="/" element={<SearchPage />} />
              <Route exact path="/registro" element={<RegisterPage />} />
              <Route exact path="/migrante/:id" element={<PersonDataPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/users/add" element={<AddUserPage />} />
              <Route exact path="/users" element={<UsersPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </ThemeProvider>
  )
}

export default App