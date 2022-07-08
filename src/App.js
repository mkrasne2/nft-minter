import React from 'react';
import Header from './components/Header.js'
import { useEffect } from 'react';
import abi from './components/abi.json';
import Mint from './pages/Mint.js';
import Collection from './pages/Collection.js';
import About from './pages/About.js';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";


function Mintitems() {
return (
  <div>
  <Header 
  title="Mint New NFTs"
  message="Mint NFTs and Upload to IPFS Here"/>
  <Mint />
  </div>
)
}
function Collect() {
  return (
    <div>
    <Header 
    title="View NFT Collection"
    message="You Can View Your NFT Collection Here"/>
    <Collection />
    </div>
  )
  }

  function Aboot() {
    return (
      <div>
      <Header 
      title="About"
      message="Learn About This Project"/>
      <About />
      </div>
    )
    }


export default function App() {
  return (
    <div >
      
    
    <Routes>
      <Route  path='/' element={<Mintitems />} />
    </Routes>
    <Routes>
      <Route  path='/collection' element={<Collect />} />
    </Routes>
    <Routes>
      <Route  path='/about' element={<Aboot />} />
    </Routes>
  
  </div>
  );
}