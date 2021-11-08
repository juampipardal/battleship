import { ChangeEvent } from "react";
import './toogle-switch.scss';

interface ToogleSwitchInterface {
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    defaultChecked: boolean;
    currentValue: boolean;
    texts: string[];
}

export const ToogleSwitch = ({name, currentValue, defaultChecked, onChange, texts}: ToogleSwitchInterface) => {

    return (
        <div className="toggle-switch small-switch">
            <input type="checkbox" className="toggle-switch-checkbox" checked={currentValue} onChange={onChange}  name={name} id={name} />
            <label className="toggle-switch-label" htmlFor={name}>
                <span className="toggle-switch-inner" data-yes={texts[0]} data-no={texts[1]}></span>
                <span className="toggle-switch-switch"></span>
            </label>
        </div>
    )

}