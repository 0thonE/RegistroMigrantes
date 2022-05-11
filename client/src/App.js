import React from 'react'
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@sproutsocial/racine'

// Components
import { NavBar } from "./components";

// Pages
import LoginPage from "./pages/LoginPage";


const App = (props) => {
  return (

    <ThemeProvider>
      <div className="App">
        <NavBar />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App