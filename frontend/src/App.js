import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppPage from './components/Pages/AppPage/AppPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';

function App() {
  	// заглушка
	let user = null;

	return (    
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AppPage user={user}/>}/> 
					<Route path='/user_activation' element={<UserActivationPage/>}/> 
				</Routes>
        	</BrowserRouter>
		</div>
	);
}

export default App;
