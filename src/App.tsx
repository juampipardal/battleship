import { useState } from 'react';
import './App.scss';
import { EndScreen } from './components/end-screen/end-screen';
import { GameScreen } from './components/game-screen/game-screen';
import { StartScreen } from './components/start-screen/start-screen';
import { ViewsInterface } from './models/views.interface';
import { Provider } from 'react-redux';
import { store } from './store';


const App = () => {

  const [view, setView] = useState<ViewsInterface>({startScreen: true, gameScreen: false, endGameScreen: false});

  return (
    <Provider store={store}>
      <div className="App">
        {view.startScreen && <StartScreen onStartGame={() => setView({startScreen: false, gameScreen: true, endGameScreen: false})}></StartScreen>}
        {view.gameScreen && <GameScreen onSurrender={() => setView({startScreen: false, gameScreen: false, endGameScreen: true})} onEndGame={() => setView({startScreen: false, gameScreen: false, endGameScreen: true})}></GameScreen>}
        {view.endGameScreen && <EndScreen  onPlayAgain={() => setView({startScreen: true, gameScreen: false, endGameScreen: false})}></EndScreen>}
      </div>
    </Provider>

  );
}

export default App;
