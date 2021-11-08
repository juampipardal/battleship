import './welcome.scss';

export const Welcome = () => {
    return(
        <div className="welcome-container">
            <p>Welcome to Batteship. Please, select a ship, set direction and sense, and then click on a valid cell to add it to your fleet.🚢🚢</p>
            <p>Once you add all your ships, please insert your name and click on Start Game button. Good luck! 🍀</p>
        </div>
    );
}