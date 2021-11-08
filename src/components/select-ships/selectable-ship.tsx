import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ship, ShipType } from '../../models/ship';
import { RootState } from '../../store';
import { ToogleSwitch } from '../toogle-switch/toogle-switch';

import './selectable-ship.scss';

interface SelectShipInterface {
    name: ShipType;
    size: number;
    availableQuantity: number;
}

export const SelectableShip = ({name, size, availableQuantity}: SelectShipInterface) => {

    const pendingShip = useSelector((state: RootState) => state.user.battlefield.shipPendingToAdd);
    const [directionHorizontal, setDirectionHorizontal] = useState<boolean>(true);
    const [sensePositive, setSensePositive] = useState<boolean>(true);
    const dispatch = useDispatch();
    const didMountRef = useRef(false);



    const updateShip = () => {
        const ship = new Ship(name, size, [0,0], directionHorizontal ? 'horizontal' : 'vertical', sensePositive ? 'positive' : 'negative');
        if (availableQuantity > 0) {
            dispatch({type: 'user_setPendingShipToAdd', payload: ship})

        } 
    }

    const onChangeDirectionValue = (event: FormEvent<HTMLDivElement>) => {
        setDirectionHorizontal(!directionHorizontal);
    }

    const onChangeSenseValue = (event: FormEvent<HTMLDivElement>) => {
        setSensePositive(!sensePositive);
    }

    useEffect(() => {
        if (didMountRef.current) {
            updateShip();
        } else {
            didMountRef.current = true;
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [directionHorizontal, sensePositive]);

    return (
        <div className={["ship",  (pendingShip?.shipType === name) ? "-is-selected" : ""].join(' ')} onClick={updateShip} >
            <div className="left-side">
                <span className="ship-name">{name}</span> 
                <div className="parts-container">
                    {new Array(size).fill('').map((x, index) => <div key={index} className="part">{index + 1}</div>)}
                </div>
            </div>
            <div className="right-side">
                <span className="text-bold">Available: <span>{availableQuantity}</span></span>
                <div className="sense-direction-container">
                    <div className="direction" id={`${name}-direction`}>
                    <span className="text-bold -pr">Direction:</span>
                        <ToogleSwitch name={`${name}-direction-switch`} onChange={onChangeDirectionValue} defaultChecked={directionHorizontal} currentValue={directionHorizontal} texts={['horizontal', 'vertical']}></ToogleSwitch>
                        <span className='direction-span -pl'>{directionHorizontal ? 'Horizontal' : 'vertical'}</span>
                    </div>
                </div>
                <div className="sense-direction-container">
                    <div className="sense" id={`${name}-sense`}>
                        <span className="text-bold -pr">Sense:</span>
                        <ToogleSwitch name={`${name}-sense-switch`} onChange={onChangeSenseValue} defaultChecked={sensePositive} currentValue={sensePositive} texts={['Positive', 'Negative']}></ToogleSwitch>
                        <span className='direction-span -pl'>{sensePositive ? 'Positive' : 'Negative'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}