import React, { useState } from 'react';
import './App.scss';
import { EndScreen } from './components/end-screen/end-screen';
import { GameScreen } from './components/game-screen/game-screen';
import { StartScreen } from './components/start-screen/start-screen';
import { ViewsInterface } from './models/views.interface';



const App = () => {

  const [view, setView] = useState<ViewsInterface>({startScreen: true, gameScreen: false, endGameScreen: false});

  return (
    <div className="App">
      {view.startScreen && <StartScreen></StartScreen>}
      {view.gameScreen && <GameScreen></GameScreen>}
      {view.endGameScreen && <EndScreen></EndScreen>}
    </div>
  );
}

export default App;
