import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Battlefield } from '../../../models/battlefield';
import { Ship } from '../../../models/ship';

export interface BattlefieldState {
  battlefield: Battlefield;
  shipPendingToAdd: Ship;
  clickedEmptyCells: [number, number][]; // WATER
};

// Define the initial state using that type
export const battlefieldInitialState: BattlefieldState = {
  battlefield: new Battlefield([], [10, 10]),
  shipPendingToAdd: null,
  clickedEmptyCells: []
};


export function createBattlefieldReducer(name: string, customInitialState?: Function) {
  return  (state: BattlefieldState = customInitialState ? customInitialState() : battlefieldInitialState, action: {type: string, payload: any}): BattlefieldState => {
    switch (action.type) {
      case `${name}_addShip`: {
        const ships = [...state.battlefield.ships, action.payload];
        return {
          ...state,
          battlefield: new Battlefield(ships, state.battlefield.dimensions),
          shipPendingToAdd: null
        }
      }
      case `${name}_setPendingShipToAdd`: {
        return {
          ...state,
          shipPendingToAdd: action.payload
        }
      }
      case `${name}_addEmptyCell`: {
        const newEmptyCells = [...state.clickedEmptyCells, action.payload];
        return {
          ...state,
          clickedEmptyCells: newEmptyCells
        }
      }
      case `${name}_updateShipsState`: {
        return {
          ...state,
          battlefield: new Battlefield(action.payload, state.battlefield.dimensions)
        }
      }
      default: 
        return state;
    }
  };
}

