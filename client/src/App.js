import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.scss';
import { ThemeProvider } from '@sproutsocial/racine'
import { Routes, Route } from 'react-router-dom';

// Components
import { NavBar } from "./components";

//Pages
// import SearchPage from "./pages/SearchPage";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage"; 

const App = props => (
  <ThemeProvider>

    <div className="App">
      <NavBar />
      <div className="wrapper">
        <Routes>
          {/* <Route path="/" element={<SearchPage />} />
          <Route path="/registro" element={<RegisterPage />} /> */}
          <Route path="/" element={<div>LandingPage</div>} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </div>
  </ThemeProvider>
)

export default App;
