import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './styles/index.css';
import Home from "./Pages/Home/Home.js";
import About from "./Pages/About/About.js";
import NotFound from "./Pages/NotFound/NotFound.js";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
    <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
    </Routes>
  </BrowserRouter>
);