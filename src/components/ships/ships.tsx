import { Ship } from '../../models/ship';
import { SelectableShip } from '../select-ships/selectable-ship';
import './ships.scss';


interface ShipsUI {
    ships: Ship[];
}

export const ShipsUI = ({ships}: ShipsUI) => {

    return (
        <div className="ships-container">
            <SelectableShip name={'carrier'} size={4} availableQuantity={1 - ships.filter(ship => ship.shipType === 'carrier').length}></SelectableShip>
            <SelectableShip name={'cruiser'} size={3} availableQuantity={3 - ships.filter(ship => ship.shipType === 'cruiser').length}></SelectableShip>
            <SelectableShip name={'submarine'} size={2} availableQuantity={1 - ships.filter(ship => ship.shipType === 'submarine').length}></SelectableShip>
        </div>
    )
}