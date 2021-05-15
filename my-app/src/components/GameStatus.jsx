import { useState } from "react";
import { Button } from "react-bootstrap";

const GameStatus = ({ onChange }) => {
    const [gameStatus, setGameStatus] = useState('stopped');

    const changeGameStatus = (status) => {
        if (onChange) onChange(status);
        setGameStatus(status)
    }
    return (
        <div className="game-status">
            {gameStatus === 'stopped' &&
            <Button size="lg" onClick={() => changeGameStatus('started')} variant="primary">Start</Button>}

            {gameStatus === 'started' &&
            <Button size="lg" onClick={() => changeGameStatus('stopped')} variant="warning">Stop</Button>}
        </div>
    )
}

export default GameStatus;