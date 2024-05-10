import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import BeforeLoginPage from './components/Pages/BeforeLoginPage/BeforeLoginPage';
import UserActivationPage from './components/Pages/UserActivationPage/UserActivationPage';
import AfterLoginPage from './components/Pages/AfterLoginPage/AfterLoginPage';
import { UserProvider } from './contexts/UserContext/UserProvider';
import { LoadingProvider } from './contexts/LoadingContext/LoadingProvider';
import { ResponseHandlerProvider } from './contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { MainBlockAnimationProvider } from './contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { ActionControlProvider } from './contexts/ActionControlContext/ActionControlProvider';
import { NavigationProvider } from './contexts/NavigationContext/NavigationProvider';
import OtherUserPage from './components/Pages/OtherUserPage/OtherUserPage';
import { 
    AFTER_LOGIN_PAGE_URL,
    ANOTHER_USER_PAGE_URL,
    BEFORE_LOGIN_PAGE_URL,
    USER_ACTIVATION_PAGE_URL
} from './constants';

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
                    <Route path={`${BEFORE_LOGIN_PAGE_URL}`} element={
                        <BeforeLoginPage />
                    }/> 
                    <Route path={`${USER_ACTIVATION_PAGE_URL}`} element={
                        <UserActivationPage />
                    }/>
                    <Route path={`${AFTER_LOGIN_PAGE_URL}/:username`} element={
                        <ActionControlProvider>
                            <AfterLoginPage />
                        </ActionControlProvider>                        
                    }/>
                    <Route path={`${ANOTHER_USER_PAGE_URL}/:username`} element={
                        <OtherUserPage />                        
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
