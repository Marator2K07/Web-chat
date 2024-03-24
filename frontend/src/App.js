import { Route, Routes, useLocation } from 'react-router-dom';
import BeforeLoginPage from './components/Pages/BeforeLoginPage/BeforeLoginPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';
import { UserProvider } from './contexts/UserContext/UserProvider';
import { LoadingProvider } from './contexts/LoadingContext/LoadingProvider';
import { ResponseHandlerProvider } from './contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import { MainBlockAnimationProvider } from './contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { NavigationProvider } from './contexts/NavigationContext/NavigationProvider';
import { OTHER_USER_ROUTE } from './constants';
import OtherUserPage from './components/Pages/OtherUserPage/OtherUserPage';

function App() {
    const location = useLocation();
    return (    
        <div className="App">			
            <LoadingProvider>
            <ResponseHandlerProvider>
            <MainBlockAnimationProvider>
            <NavigationProvider>
            <UserProvider>
            <AnimatePresence mode='wait' initial={false}>				
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <BeforeLoginPage/>
                    }/> 
                    <Route path="user_activation" element={
                        <UserActivationPage/>
                    }/>
                    <Route path="authorized_user/:username" element={
                        <AfterLoginPage/>
                    }/>
                    <Route path={`${OTHER_USER_ROUTE}`} element={
                        <OtherUserPage/>                        
                    }/>
                </Routes>
            </AnimatePresence>
            </UserProvider>
            </NavigationProvider>
            </MainBlockAnimationProvider>	
            </ResponseHandlerProvider>				
            </LoadingProvider>
    	</div>
    );
}

export default App;
