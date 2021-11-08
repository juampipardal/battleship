import './cell.scss';


interface CellProps  {
    XIndex: number;
    YIndex: number;
    hasShip: boolean;
    isHitted: boolean;
    isDestroyed: boolean;
    isEmptyClicked: boolean;
    cpuBattlefield: boolean;
    click: Function;
}

export const Cell = ({XIndex, YIndex, hasShip, click, isHitted, isDestroyed, isEmptyClicked, cpuBattlefield}: CellProps) => {
    let cssApplied = isDestroyed ? "-red-background" : isHitted ? '-orange-background' : (hasShip && !cpuBattlefield) ? '-green-background' : isEmptyClicked ? '-light-blue-background' : '';

    return (
        <div onClick={() => click()} className={['cell', cssApplied].join(' ')}></div>
    )
}