import './App.css';
import AppPage from './components/AppPage/AppPage';

function App() {
  	// заглушка
	let user = null;

	return (    
		<div className="App">
			<AppPage user={user}></AppPage>
		</div>
	);
}

export default App;
