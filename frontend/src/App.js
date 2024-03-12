import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppPage from './components/Pages/AppPage/AppPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';

function App() {
	return (    
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AppPage/>}/> 
					<Route path='/user_activation' element={<UserActivationPage/>}/>
					<Route path='/authorized_user/:username' element={<AfterLoginPage/>}/>
				</Routes>
        	</BrowserRouter>
		</div>
	);
}

export default App;
