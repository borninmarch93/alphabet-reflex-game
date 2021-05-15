import { Container } from "react-bootstrap";
import DifficultySelector from "../components/DifficultySelector";

const GameLevelPage = () => {
    return (
        <Container className="alphabet-game--center">
            <div className="alphabet-game ">
                <h1 className="header">Choose level</h1>
                <DifficultySelector />
            </div>
        </Container>
    )
}

export default GameLevelPage;