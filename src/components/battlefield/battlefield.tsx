import { Cell } from '../cell/cell';
import './Battlefield.scss';

export const Battlefield = () => {
    const arr: number[] = new Array(10).fill(0);
    return (
        <div className="Battlefield">
            <table>
                <tbody>
                    {arr.map((y, YIndex) => <tr>
                        {arr.map((x, XIndex) => <td><Cell YIndex={YIndex} XIndex={XIndex}></Cell></td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}