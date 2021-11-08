import { useDispatch, useSelector } from 'react-redux';
import { Battlefield } from '../../models/battlefield';
import { Ship } from '../../models/ship';
import { RootState } from '../../store';
import { Cell } from '../cell/cell';
import { BattlefieldState } from "./store/battlefield.reducer";
import './Battlefield.scss';
import { useEffect } from 'react';
import { Play } from '../../models/play';



type BattlefieldModality = 'select' | 'onGameUser' | 'onGameCPU';

interface BattlefieldProps {
    battlefield: BattlefieldState;
    modality: BattlefieldModality;
    isPlaying: string;
};


export const BattlefieldUI = ({modality, battlefield, isPlaying}: BattlefieldProps) => {
    const dispatch = useDispatch();

    const handleSelectModality = (x: number, y: number) => {
        if (battlefield.shipPendingToAdd) {
            const newShip = new Ship(battlefield.shipPendingToAdd.shipType, battlefield.shipPendingToAdd.size, [x,y], battlefield.shipPendingToAdd.direction, battlefield.shipPendingToAdd.sense);
            if (battlefield.battlefield.canAddShipInPosition(newShip)) {
                dispatch({type: 'user_addShip', payload: newShip});
            }
        }
    }

    const handleUserClicksOnCPUBattlefield = (x: number, y: number) => {
        if (battlefield.battlefield.hasShipInXY(x, y)) {
            const ship: Ship = battlefield.battlefield.getShipInXY(x, y);
            const idx: number = ship.getShipIndexFromCoordinates(x, y);
            ship.hitShipPosition(idx);
            dispatch({type: 'addPlay', payload: new Play('user', [x, y], true, ship.isDestroyed())});
            dispatch({type: 'CPU_updateShipsState', payload: battlefield.battlefield.ships});
        } else {
            dispatch({type: 'addPlay', payload: new Play('user', [x, y], false, false)});
            dispatch({type: 'CPU_addEmptyCell', payload: [x, y]});
        }
    }

    const handleCellClick = (x: number, y: number) => {
        if (modality === 'select' && isPlaying === 'user') {
            handleSelectModality(x, y);
        }
        if (modality === 'onGameCPU' && isPlaying === 'user') {
            handleUserClicksOnCPUBattlefield(x, y);
            dispatch({type: 'setNextTurn', payload: 'CPU'});
        }
    }

    const isHitted = (x: number, y: number): boolean => {
        if (battlefield.battlefield.hasShipInXY(x, y)) {
            const ship: Ship = battlefield.battlefield.getShipInXY(x, y);
            return ship.isShipHittedInCoordinate(x, y);            
        }
        return false;
    }

    const isDestroyed = (x: number, y: number): boolean => {
        if (battlefield.battlefield.hasShipInXY(x, y)) {
            const ship: Ship = battlefield.battlefield.getShipInXY(x, y);
            return ship.isDestroyed();            
        }
        return false;  
    }

    const isEmpty = (x: number, y: number): boolean => {
        return !!battlefield.clickedEmptyCells.find(c => c[0] === x && c[1] === y);
    }

    const arr1: number[] = new Array(battlefield.battlefield.dimensions[0]).fill(0);
    const arr2: number[] = new Array(battlefield.battlefield.dimensions[1]).fill(0);
    return (
        <div className="Battlefield">
            <table>
                <tbody>
                    {arr2.map((y, YIndex) => <tr key={YIndex}>
                        {arr1.map((x, XIndex) =>
                            <td key={`${XIndex}-${YIndex}`}>
                                <Cell 
                                    hasShip={battlefield.battlefield.hasShipInXY(XIndex, YIndex)}
                                    isHitted={isHitted(XIndex, YIndex)}
                                    isDestroyed={isDestroyed(XIndex, YIndex)}
                                    isEmptyClicked={isEmpty(XIndex, YIndex)}
                                    cpuBattlefield={modality === 'onGameCPU'}
                                    click={() => handleCellClick(XIndex, YIndex)}
                                    YIndex={YIndex}
                                    XIndex={XIndex}
                                ></Cell>
                            </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}