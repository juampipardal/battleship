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


export const posibleShipCoordinate = (lastPlays: Play[]): number[] => {
    
    let randomCoordinates: [number, number];
    const cpuPlays = lastPlays.filter(play => play.from === 'CPU');

    do {
        randomCoordinates = [randomIntFromInterval(0, 9), randomIntFromInterval(0, 9)];
    }   while(cpuPlays.find(play => play.position[0] === randomCoordinates[0] && play.position[1] === randomCoordinates[1]));

    const cpuHitPlays = cpuPlays.filter(play => play.hit && !play.destroyed);
    const lastHitPlay = cpuHitPlays[cpuHitPlays.length - 1];

    if (!lastHitPlay) {
        return randomCoordinates;
    }

    const possiblesNextPlays = [
        [ lastHitPlay.position[0], lastHitPlay.position[1] + 1 ],
        [ lastHitPlay.position[0], lastHitPlay.position[1] - 1 ],
        [ lastHitPlay.position[0] + 1, lastHitPlay.position[1] ],
        [ lastHitPlay.position[0] - 1, lastHitPlay.position[1] ]
    ];


    const nextPlays = possiblesNextPlays.filter(nextPlay => !cpuPlays.find(p => p.position[0] === nextPlay[0] && p.position[1] === nextPlay[1]));

    if (nextPlays && nextPlays.length > 0) {
        const playsLength = nextPlays.length;
        const randomPlay = nextPlays[randomIntFromInterval(0, playsLength - 1)];
        if (!randomPlay) {
            return randomCoordinates;
        }
        return [randomPlay[0], randomPlay[1]]; 
    }

    return randomCoordinates;
}