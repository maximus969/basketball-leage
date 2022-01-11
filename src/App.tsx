import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRootStateType } from './core/redux/store';
import { Header } from './pages/main/Header/Header';
import { Sidebar } from './pages/main/sidebar/Sidebar';
import { Routs } from './pages/Routs';


function App() {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        {isLoggedIn && <Sidebar />}
        <Routs />
      </BrowserRouter>
    </div>
  );
}

export default App;
