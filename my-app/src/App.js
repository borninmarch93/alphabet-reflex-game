import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Form} from "react-bootstrap";
import DifficultySelector from "./components/DifficultySelector";
import { useEffect, useState } from "react";
import GameStatus from "./components/GameStatus";
import RandomNumber from "./components/RandomNumber";
import LetterInput from "./components/LetterInput";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetMap = [...alphabet].reduce((prev, curr) => {
    prev[curr] = alphabet.indexOf(curr);
    return prev;
}, {});

const App = () => {
    const [pool, setPool] = useState([...Array(26).keys()]);
    const [currentNumber, setCurrentNumber] = useState();
    const [difficultyLevel, setDifficultyLevel] = useState();
    const [gameStatus, setGameStatus] = useState();
    const [scores, setScores] = useState({
            hit: 0,
            miss: 0
        }
    );

    useEffect(() => {
        if (difficultyLevel && gameStatus === 'started') {
            const timer = setTimeout(() => {
                const filterPool = pool.filter(num => num !== currentNumber)
                setPool(filterPool);
            }, difficultyLevel.time);
            return () => clearTimeout(timer);
        }
    }, [currentNumber, gameStatus]);

    const handleSubmit = (letter) => {
        if (currentNumber === alphabetMap[letter]) {
            setScores({...scores, hit: scores.hit + 1})
        } else {
            setScores({...scores, miss: scores.miss + 1})
        }
    }

    const difficultyLevelChangeHandler = (difficultyLevel) => {
        setDifficultyLevel(difficultyLevel);
    }

    return (
        <Container>
            <Row>
                <Col lg={9}>
                    <Row>
                        <DifficultySelector onChange={difficultyLevelChangeHandler}/>
                    </Row>
                    <Row>
                        <GameStatus onChange={(status) => setGameStatus(status)}/>
                    </Row>
                    {gameStatus === 'started' &&
                    <Row>
                        <RandomNumber onChange={(num) => setCurrentNumber(num)} pool={pool}/>
                    </Row>
                    }
                    <Row>
                        <LetterInput onSubmit={handleSubmit}/>
                    </Row>
                    <Row>
                        <div className="alphabet-game-table">
                            {Object.keys(alphabetMap).map(letter => {
                                return <div className="alphabet-game-table__item">
                                    {`${letter} (${alphabetMap[letter]})`}
                                </div>
                            })}
                        </div>
                    </Row>
                </Col>
                <Col lg={3}>
                    <Row><span>Score</span></Row>
                    <Row><span>Hit:</span><span>{scores.hit}</span></Row>
                    <Row><span>Miss:</span><span>{scores.miss}</span></Row>
                    <Row><span>Left:</span><span>{pool.length}</span></Row>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
