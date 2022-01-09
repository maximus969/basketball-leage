import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from './pages/Header';
import { Routs } from './pages/Routs';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routs />
      </BrowserRouter>
    </div>
  );
}

export default App;
