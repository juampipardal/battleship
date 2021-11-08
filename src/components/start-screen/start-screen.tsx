import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { BattlefieldUI } from "../battlefield/battlefield"
import { ShipsUI } from "../ships/ships";
import { Welcome } from '../welcome/welcome';

import './start-screen.scss';   

interface StartScreenInterface {
    onStartGame: Function
}

export const StartScreen = ({onStartGame}: StartScreenInterface) => {

    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(setName(e.target.value))
        dispatch({type: 'setName', payload: e.target.value})
    };

    const handleClick = () => {
        if (userState.user.name) {
            onStartGame();
        }
    };
    
    return (
        <div className="Start-screen">
            <div className="welcome-wrapper">
                <Welcome></Welcome>
            </div>
            <div className="row">
                <div className="left">
                    <BattlefieldUI battlefield={userState.battlefield} modality="select" isPlaying={'user'}></BattlefieldUI>
                </div>
                <div className="right">                    
                    <ShipsUI ships={userState.battlefield.battlefield.ships}></ShipsUI>
                    <div className="name-input">
                        <input type="text" placeholder="Player name" value={userState.user.name} onChange={(e) => onChangeInput(e)}/>
                        <div className="start-button-container">
                            <button onClick={handleClick}>Start game</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}