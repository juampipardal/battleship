import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import './end-screen.scss';


interface EndScreenInterface {
    onPlayAgain: () => void
}

export const EndScreen = ({onPlayAgain}: EndScreenInterface) => {

    const gameState = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    
    const handlePlayAgain = () => {
        dispatch({type: 'playAgain'});
        onPlayAgain();
    }

    return (
        <div className='end-screen'>
            <div className="container">                
                <div className="message-container">
                    {gameState.winner === 'CPU' && <span className="game-over">Game Over. {gameState.surrender ? 'you have given up. You can play again.' : 'You has been defeated by the CPU'}</span>}
                    {gameState.winner === 'user' && <span className="congratulations">Congratulations. You defeated the CPU</span>}

                </div>
                <div className="btn-container">
                    <button onClick={handlePlayAgain}>Play again</button>
                </div>
            </div>
        </div>
    )
}