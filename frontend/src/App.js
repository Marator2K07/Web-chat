import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BeforeLoginPage from './components/Pages/BeforeLoginPage/BeforeLoginPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';
import { UserProvider } from './contexts/UserContext/UserProvider';
import { LoadingProvider } from './contexts/LoadingContext/LoadingProvider';
import { ResponseHandlerProvider } from './contexts/ResponseHandlerContext/ResponseHandlerProvider';

function App() {
	return (    
		<div className="App">
			<BrowserRouter>
			<LoadingProvider>
			<ResponseHandlerProvider>
				<Routes>						
						<Route path='/user_activation' element={ <UserActivationPage/> }/>
						<Route path='/' element={
							<UserProvider>
								<BeforeLoginPage/>
							</UserProvider>
						}/> 
						<Route path='/authorized_user/:username' element={
							<UserProvider>
								<AfterLoginPage/>
							</UserProvider>						
						}/>
				</Routes>
			</ResponseHandlerProvider>				
			</LoadingProvider>				
        	</BrowserRouter>
		</div>
	);
}

export default App;
