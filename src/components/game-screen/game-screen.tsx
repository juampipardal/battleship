import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play } from '../../models/play';
import { Ship } from '../../models/ship';
import { RootState } from '../../store';
import { posibleShipCoordinate, randomIntFromInterval } from '../../utils/cpu.utils';
import { BattlefieldUI } from '../battlefield/battlefield';
import { GameInfo } from '../game-info/game-info';
import './game-screen.scss';


interface GameScreenInterface {
    onEndGame: Function;
    onSurrender: Function;
}

export const GameScreen = ({onEndGame, onSurrender}: GameScreenInterface) => {
    
    const rootState = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const handleRoundStart = () => {
        if (rootState.user.battlefield.battlefield.isFleetSunken()) {
            dispatch({type: 'setWinner', payload: 'CPU'});
            onEndGame();
        }
        if (rootState.cpu.battlefield.battlefield.isFleetSunken()) {
            dispatch({type: 'setWinner', payload: 'user'});
            onEndGame();
        }
    };

    const handleSurrenderClick = () => {
        dispatch({type: 'surrender'});
        onSurrender();
    };

    useEffect(() => {
        handleRoundStart();
        if (rootState.game.actualTurn === 'CPU') {
            setTimeout(() => {                
                
                const possibleHit = posibleShipCoordinate(rootState.game.history);
                const x = possibleHit[0];
                const y = possibleHit[1];

                if ( rootState.user.battlefield.battlefield.hasShipInXY(possibleHit?.[0] || x, possibleHit?.[1] || y)) {
                    const ship: Ship = rootState.user.battlefield.battlefield.getShipInXY(x, y);
                    const idx: number = ship.getShipIndexFromCoordinates(x, y);
                    ship.hitShipPosition(idx);
                    dispatch({type: 'addPlay', payload: new Play('CPU', [x, y], true, ship.isDestroyed())});
                    dispatch({type: 'user_updateShipsState', payload: rootState.user.battlefield.battlefield.ships});
                } else {
                    dispatch({type: 'addPlay', payload: new Play('CPU', [x, y], false, false)});
                    dispatch({type: 'user_addEmptyCell', payload: [x, y]});
                }
                dispatch({type: 'setNextTurn', payload: 'user'});
            }, 500);
        }
    }, [rootState.game.actualTurn]);

    return (
        <div className="game-screen-container">
            <div className="container">
                <div className='boards'>
                    <div className="user-battlefield">
                        <h3>{rootState.user.user.name}</h3>
                        <BattlefieldUI battlefield={rootState.user.battlefield} modality="onGameUser" isPlaying={rootState.game.actualTurn}></BattlefieldUI>
                    </div>
                    <div className="cpu-battlefield">
                        <h3>{'CPU'}</h3>
                        <BattlefieldUI battlefield={rootState.cpu.battlefield} modality="onGameCPU" isPlaying={rootState.game.actualTurn}></BattlefieldUI>
                    </div>
                </div>
                <div className='surrender-button-container'>
                    <button onClick={handleSurrenderClick}>Surrender</button>
                </div>
                <GameInfo></GameInfo>
            </div>
        </div>
    )
}