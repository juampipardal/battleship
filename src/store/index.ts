import { combineReducers, createStore } from '@reduxjs/toolkit';
import CPUReducer from './cpu/cpu.reducer';
import userReducer from './user/user.reducer';
import { gameReducer } from './game/game.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


export const appReducer = combineReducers({
    cpu: CPUReducer,
    game: gameReducer,
    user: userReducer,
});  

const rootReducer = (state: any, action: any) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'playAgain') {
      state = undefined;
    }
    return appReducer(state, action);
  };

export type RootState = ReturnType<typeof appReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
