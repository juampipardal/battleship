import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import './game-info.scss';

export const GameInfo = () => {
    const rootState = useSelector((state: RootState) => state);
    return (
        <div className="game-info-container">
            <span className="is-playing">is playing: <span className="player">{rootState.game.actualTurn === 'user' ? rootState.user.user.name : 'CPU'}</span></span>
            {rootState.game.history.slice().reverse().map((play, index) => <div key={index} className={["play-message-container", play.hit && play.destroyed ? '-red-text' : play.hit ? '-orange-text' : '-light-blue-text' ].join(' ')}><span>{play.buildMessage(rootState.user.user.name)}</span></div>)}
        </div>
    )
}