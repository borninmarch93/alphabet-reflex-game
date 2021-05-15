import {Button, Container, Row, Col, Form} from "react-bootstrap";
import { Link } from "react-router-dom";

const StartGamePage = () => {
    return (
        <Container>
            <div className="alphabet-game">
                <h1 className="header">Alphabet reflex game</h1>
                <p>Test</p>
                <Link to="/choose-level">
                    <Button size="lg">Start game</Button>
                </Link>
            </div>
        </Container>
    )
}

export default StartGamePage;