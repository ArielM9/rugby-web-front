import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/Sidebar";
import Features from "./components/Layout";
import Footer from "./components/Footer";
import "./index.css";
import Calendario from "./components/Calendario";
import  Derecha from "./components/Derecha";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Carrousel from "./components/Carrousel";

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="app">
        
            
          <Carrousel />
                   
          <Layout />
        
        
        
        {/* Sidebar derecho vacío */}
        <Derecha />
      </div>
    </>
  );
};
export default App;