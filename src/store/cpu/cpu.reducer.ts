import { combineReducers, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { createBattlefieldReducer } from '../../components/battlefield/store/battlefield.reducer';
import { generateRandomBattelfieldState } from '../../utils/cpu.utils';


const CPUReducer = combineReducers({
    battlefield: createBattlefieldReducer('CPU', generateRandomBattelfieldState)
});

export default CPUReducer;