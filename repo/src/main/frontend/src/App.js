import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import AddPage from './pages/AddPage.js';
import UpdatePage from './pages/UpdatePage.js';

function App() {
  return (
    <Routes>
        <Route>
            <Route path="/" exact={true} element={<MainPage />} />
            <Route path="/add" exact={true} element={<AddPage />} />
            <Route path="/update" exact={true} element={<UpdatePage />} />
        </Route>
    </Routes>
  );
}

export default App;
