import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OutfitsList from "./pages/OutfitsList";
import Addproduct from "./pages/Addproduct";
import HomeWeatherList from "./pages/HomeWeatherList"
import NavBar from "./components/NavBar"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from './pages/Signup';
function App() {

  return (
    <>
            <NavBar/>
      <Routes>
      <Route path="/" element={<HomeWeatherList />} />
      <Route path="list" element={<OutfitsList/>} />
      <Route path="Addproduct" element={<Addproduct />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

        
      </Routes>
    </>
  )
}

export default App
