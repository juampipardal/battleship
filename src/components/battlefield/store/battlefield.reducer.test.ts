import { Battlefield } from "../../../models/battlefield";
import { battlefieldInitialState, createBattlefieldReducer } from "./battlefield.reducer";

jest.mock('../../../models/battlefield.ts', () => {
    return {
      Battlefield: jest.fn().mockImplementation(() => {
        return {};
      })
    };
});
  

describe('Game Reducer', () => {
    it('should return the initial state', () => {
        const bf = new Battlefield([], [10, 10]);
        expect(createBattlefieldReducer('user')(undefined, {type: ''})).toEqual({
            battlefield: bf,
            shipPendingToAdd: null,
            clickedEmptyCells: []
        });
    });
});

