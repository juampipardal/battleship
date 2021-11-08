import { combineReducers } from '@reduxjs/toolkit'
import { createBattlefieldReducer } from '../../components/battlefield/store/battlefield.reducer';

export interface UserState {
    name: string;
};

const initialState: UserState = {
    name: '',
};

export const reducer =  (state: UserState = initialState, action: {type: string, payload: any}): UserState => {
    switch (action.type) {
        case `setName`:
        return {
            ...state,
            name: action.payload
        }
        default: 
        return state;
    }
};



const userReducer = combineReducers({
    user: reducer,
    battlefield: createBattlefieldReducer('user')
});

export default userReducer;