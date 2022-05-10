import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Main from './pages/Main/Main.js';
import List from './pages/List/List.js';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
