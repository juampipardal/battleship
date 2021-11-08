import { BattlefieldState, battlefieldInitialState } from "../components/battlefield/store/battlefield.reducer";
import { Battlefield } from "../models/battlefield";
import { Ship, ShipType } from "../models/ship";
import { gameConfig } from '../config/game.config';
import { Play } from "../models/play";


export const generateRandomBattelfieldState = (): BattlefieldState => {

    
    const battlefield = new Battlefield([], battlefieldInitialState.battlefield.dimensions);
    gameConfig.ships.forEach((ship) => {
        new Array(ship.quantity).fill('').forEach(sh => {
            const randomShip = battlefield.generateRandomShip(<ShipType> ship.name, ship.size);
            battlefield.addShip(randomShip);
        });
    });
    

    return {
        ...battlefieldInitialState,
        battlefield
    }
}

export function randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export const posibleShipCoordinate = (lastPlays: Play[]): [number, number] => {
    
    return [0,0];
}