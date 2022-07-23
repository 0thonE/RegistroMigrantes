import './App.scss';

import { Routes, Route } from 'react-router-dom';

import { LoginPage } from 'pages';
import { Navbar } from 'components';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="root-container">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
