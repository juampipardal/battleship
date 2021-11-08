export type ShipDirection = 'vertical' | 'horizontal';
export type ShipSense = 'positive' | 'negative';

export type ShipType = 'carrier' | 'cruiser' | 'submarine';



export class Ship {

    readonly shipType: ShipType;
    readonly size: number;
    readonly startPosition: [number, number];
    readonly direction: ShipDirection;
    readonly sense: ShipSense;
    readonly hits: boolean[];

    constructor(shipType: ShipType, size: number, startPosition: [number, number], direction: ShipDirection, sense: ShipSense) {
        this.shipType = shipType; 
        this.size = size;
        this.startPosition = startPosition;
        this.direction = direction;
        this.sense = sense;
        this.hits = new Array(size).fill(false);
    }


    public getShipVector(): [number, number][] {
        let vector: [number, number][] = [];

        if (this.direction === 'horizontal') {

            if (this.sense === 'positive') {
                new Array(this.size).fill('').forEach((p, index) => {
                    vector.push([this.startPosition[0] + index, this.startPosition[1]]);
                });
            }

            if (this.sense === 'negative') {
                new Array(this.size).fill('').forEach((p, index) => {
                    vector.push([this.startPosition[0] - index, this.startPosition[1]]);
                });
            }


        }

        if (this.direction === 'vertical') {

            if (this.sense === 'positive') {
                new Array(this.size).fill('').forEach((p, index) => {
                    vector.push([this.startPosition[0], this.startPosition[1] + index]);
                });
            }

            if (this.sense === 'negative') {
                new Array(this.size).fill('').forEach((p, index) => {
                    vector.push([this.startPosition[0], this.startPosition[1] - index]);
                });
            }

        }

        return vector;
    }


    coordinateIsInShipVector(x: number, y: number): boolean {
        return this.getShipVector().some(coordinate => coordinate[0] === x && coordinate[1] === y);
    }


    isShipHittedInCoordinate(x: number, y: number): boolean {
        const idx = this.getShipIndexFromCoordinates(x, y);
        return this.hits[idx];
    }
    
    getShipIndexFromCoordinates(x: number, y: number): number {
        return this.getShipVector().findIndex(coordinate => coordinate[0] === x && coordinate[1] === y);
    }

    hitShipPosition(index: number): void {
        this.hits[index] = true;
    }

    isDestroyed(): boolean {
        return this.hits.every(hit => hit);
    }

}