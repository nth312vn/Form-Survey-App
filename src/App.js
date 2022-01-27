
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './Pages/Login/Login';

import Resgister from './Pages/Resignter/Resgister';
import Home from './Pages/Home/Home';
import Question from './Pages/Question/Question';
import Profile from './Pages/Profile/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/user/home' element={<Home/>} />
        <Route path='/register' element={<Resgister/>} />
        <Route path='/user/question' element={<Question/>} />
        <Route path='/user/profile' element={<Profile/>} />
        <Route path="*" element={<Navigate to="/login" />}
    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
