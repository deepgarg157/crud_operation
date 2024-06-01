import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
