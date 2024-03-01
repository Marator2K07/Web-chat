import './App.css';
import Registration from './components/Pages/Registration/Registration';
import SignInPage from './components/Pages/SignInPage/SignInPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  // заглушка
  let userInfo = {
    name: "Dmitry",
    secondName: "Dmitriev",
    image: null
  }

  return (    
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Registration userInfo={userInfo}/>}/> 
                <Route path='/login' element={<SignInPage userInfo={userInfo}/>}/> 
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
