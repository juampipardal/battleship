import { gameReducer } from './game.reducer';

describe('Game Reducer', () => {
    it('should return the initial state', () => {
    
      expect(gameReducer(undefined, {type: ''})).toEqual({
        actualTurn: 'user',
        surrender: false,
        history: [],
        winner: null
      });
    });

});

