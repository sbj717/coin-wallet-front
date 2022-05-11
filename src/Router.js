import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Login from './pages/Login/Login.js';
import Main from './pages/Main/Main.js';
import List from './pages/List/List.js';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/list" element={<List />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
