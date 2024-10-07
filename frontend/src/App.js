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
import EndRecoveryPage from './components/Pages/EndRecoveryPage/EndRecoveryPage';
import { 
    AFTER_LOGIN_PAGE_URL,
    ANOTHER_USER_PAGE_URL,
    BEFORE_LOGIN_PAGE_URL,
    END_USER_RECOVERY_PAGE_URL,
    USER_ACTIVATION_PAGE_URL
} from './constants';
import { useTipsContext } from './contexts/TipsContext/TipsProvider';

function App() {
    const { updateTipsCoordinates } = useTipsContext();
    const location = useLocation();

    // при изменении размера страницы или же скроллинге, блок подсказок подстраивается
    window.addEventListener('resize', updateTipsCoordinates);

    return (    
        <div className="App">
            <LoadingProvider>
            <ResponseHandlerProvider>
            <MainBlockAnimationProvider>
            <NavigationProvider>
            <ActionControlProvider>
            <UserProvider>
            <AnimatePresence mode='wait' initial={false}>		
                <Routes location={location} key={location.pathname}>                    
                    <Route path={BEFORE_LOGIN_PAGE_URL} element={
                        <BeforeLoginPage />
                    }/> 
                    <Route path={USER_ACTIVATION_PAGE_URL} element={
                        <UserActivationPage />
                    }/>
                    <Route path={END_USER_RECOVERY_PAGE_URL} element={
                        <EndRecoveryPage />
                    }/> 
                    <Route path={`${AFTER_LOGIN_PAGE_URL}/:username`} element={
                        <AfterLoginPage />                                               
                    }/>
                    <Route path={`${ANOTHER_USER_PAGE_URL}/:username`} element={
                        <OtherUserPage />                        
                    }/>
                </Routes>
            </AnimatePresence>
            </UserProvider>
            </ActionControlProvider> 
            </NavigationProvider>
            </MainBlockAnimationProvider>	
            </ResponseHandlerProvider>				
            </LoadingProvider>
    	</div>
    );
}

export default App;
