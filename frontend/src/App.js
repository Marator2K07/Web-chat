import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BeforeLoginPage from './components/Pages/BeforeLoginPage/BeforeLoginPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';
import { UserContextProvider } from './contexts/UserContext/UserContextProvider';
import { LoadingContextProvider } from './contexts/LoadingContext/LoadingContextProvider';

function App() {
	return (    
		<div className="App">
			<BrowserRouter>
			<LoadingContextProvider>
				<Routes>
					<Route path='/' element={ <BeforeLoginPage/> }/> 
					<Route path='/user_activation' element={ <UserActivationPage/> }/>
					<Route path='/authorized_user/:username' element={
						<UserContextProvider>
							<AfterLoginPage/>
						</UserContextProvider>						
					}/>
				</Routes>
			</LoadingContextProvider>				
        	</BrowserRouter>
		</div>
	);
}

export default App;
