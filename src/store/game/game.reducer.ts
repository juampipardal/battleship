import { Play } from '../../models/play';


export interface GameState {
    actualTurn: string,
    surrender: boolean,
    history: Play[],
    winner: string
};

const initialState: GameState = {
    actualTurn: 'user',
    surrender: false,
    history: [],
    winner: null
};

export const gameReducer = (state: GameState = initialState, action: {type: string, payload?: any}): GameState => {
  switch (action.type) {
    case `addPlay`:
      return {
        ...state,
        history: [...state.history, action.payload],
      }
      case `setNextTurn`:
        return {
        ...state,
        actualTurn: action.payload
      }
      case `setWinner`:
        return {
        ...state,
        winner: action.payload
      }
      case `surrender`:
        return {
          ...state,
          winner: 'CPU',
          surrender: true
      }
      default: 
      return state;
  }
};



