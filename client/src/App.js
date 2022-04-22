import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@sproutsocial/racine'


// Components
import { NavBar } from "./components";

//Pages
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";


const App = props => (
  <ThemeProvider>

    <div className="App">
      <NavBar />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  </ThemeProvider>
)

export default App;
