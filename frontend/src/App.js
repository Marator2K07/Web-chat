import './App.css';
import DownBlock from './components/DownBlock/DownBlock';
import TopBlock from './components/TopBlock/TopBlock';

function App() {

  // заглушка
  let userInfo = {
    name: "Dmitry",
    secondName: "Dmitriev",
    image: null
  }

  return (
    <div className="App">
      <TopBlock pageText="Вход в аккаунт" userInfo={userInfo}></TopBlock>
      <DownBlock>Text</DownBlock>
    </div>
  );
}

export default App;
