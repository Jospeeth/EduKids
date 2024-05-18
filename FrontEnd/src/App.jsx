import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LangingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  console.log("App component is rendering");
  return (
   <BrowserRouter>
     <main>
         <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
         </Routes>
       </main>
   </BrowserRouter>

  );
}

export default App;
