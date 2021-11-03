import './cell.scss';


interface CellProps  {
    XIndex: number;
    YIndex: number;
}

export const Cell = ({XIndex, YIndex}: CellProps) => {
    return (
        <div className="cell">{XIndex} - {YIndex}</div>
    )
}