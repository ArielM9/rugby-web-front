// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Noticias from './pages/Noticias'
import Perfil from './pages/Perfil'
import EquiposYLigas from './pages/EquiposYLigas'

function App() {
  // const[Login, setLogin] = useState(false)


  return (
    <div>
      <Header className="header"/>
      <Routes>
        <Route path="/" element={<Home className="home" />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/datos" element={<EquiposYLigas />} />
      </Routes>
    </div>
  )
}

export default App
