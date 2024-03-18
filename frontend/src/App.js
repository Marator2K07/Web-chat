import { Route, Routes, useLocation } from 'react-router-dom';
import BeforeLoginPage from './components/Pages/BeforeLoginPage/BeforeLoginPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';
import { UserProvider } from './contexts/UserContext/UserProvider';
import { LoadingProvider } from './contexts/LoadingContext/LoadingProvider';
import { ResponseHandlerProvider } from './contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
	const location = useLocation();

	return (    
		<div className="App">
			<LoadingProvider>
			<ResponseHandlerProvider>
			<AnimatePresence mode='wait' initial={false}>				
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={
						<UserProvider>
							<BeforeLoginPage/>
						</UserProvider>						
					}/> 
					<Route path="user_activation" element={<UserActivationPage/>}/>
					<Route path="authorized_user/:username" element={
						<UserProvider>
							<AfterLoginPage/>
						</UserProvider>												
					}/>					
				</Routes>
			</AnimatePresence>	
			</ResponseHandlerProvider>				
			</LoadingProvider>
		</div>
	);
}

export default App;
