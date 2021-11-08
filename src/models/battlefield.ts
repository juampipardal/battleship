import { randomIntFromInterval } from "../utils/cpu.utils";
import { Ship, ShipType } from "./ship";

export class Battlefield {
    
    readonly dimensions: [number, number];
    readonly ships: Ship[];

    constructor(ships: Ship[], dimensions: [number, number]) {
        this.ships = ships;
        this.dimensions = dimensions;
    }

    hasShipInXY(x: number, y: number): boolean {        
        return !!this.ships.find(ship => ship.getShipVector().find(pos => pos[0] === x && pos[1] === y));
    }

    getShipInXY(x: number, y: number): Ship {
        return this.ships.find(ship => ship.getShipVector().find(pos => pos[0] === x && pos[1] === y));
    }

    getAllPositionsUsedByShips(): [number, number][] {
        return this.ships.map(ship => ship.getShipVector()).flat();
    }

    canAddShipInPosition(ship: Ship): boolean {

        const shipIsUsingInvalidCell = this.getAllPositionsUsedByShips().some(coordinate => ship.coordinateIsInShipVector(coordinate[0], coordinate[1]));
        const shipIsOutOfDimensions = ship.getShipVector().some(coordinates => coordinates[0] < 0 || coordinates[0] > (this.dimensions[0] -1) || coordinates[1] < 0 || coordinates[1] > (this.dimensions[1] - 1)); 

        return !shipIsUsingInvalidCell && !shipIsOutOfDimensions;
    }

    generateRandomShip(ship: ShipType, size: number): Ship {
        while(true) {
            
            const startPosition: [number, number] = [randomIntFromInterval(0, this.dimensions[0]), randomIntFromInterval(0, this.dimensions[1])];
            const directionHorizontal: boolean = !!randomIntFromInterval(0, 1);
            const sensePositive: boolean = !!randomIntFromInterval(0, 1);
            const shipCandidate = new Ship(ship, size, startPosition, directionHorizontal ? 'horizontal' : 'vertical', sensePositive ? 'positive' : 'negative');
            if (this.canAddShipInPosition(shipCandidate)) {
                return shipCandidate;
            }
        }
    }
    

    addShip(ship: Ship): void {
        if (this.canAddShipInPosition(ship)) {
            this.ships.push(ship);
        } else {
            throw new Error('Trying to add ship in an Ilegal position');
        }
    }

    isFleetSunken(): boolean {
        return this.ships.every(ship => ship.isDestroyed());
    }

}