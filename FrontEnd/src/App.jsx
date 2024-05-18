import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LangingPage';
import SignUp from './components/SignUp';

function App() {
  console.log("App component is rendering");
  return (
    // <BrowserRouter>
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<LandingPage />} />
    //     </Routes>
    //   </main>
    // </BrowserRouter>
<SignUp />
  );
}

export default App;
