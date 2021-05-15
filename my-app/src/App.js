import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Form} from "react-bootstrap";
import DifficultySelector from "./components/DifficultySelector";
import { useEffect, useState } from "react";
import GameStatus from "./components/GameStatus";
import RandomNumber from "./components/RandomNumber";
import LetterInput from "./components/LetterInput";
import AlphabetTable from "./components/AlphabetTable";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const App = () => {
    const [alphabetMap, setAlphabetMap] = useState([...alphabet].reduce((prev, curr) => {
        prev[curr] = {num: alphabet.indexOf(curr)};
        return prev;
    }, {}))
    const [pool, setPool] = useState([...Array(26).keys()]);
    const [currentNumber, setCurrentNumber] = useState();
    const [difficultyLevel, setDifficultyLevel] = useState();
    const [gameStatus, setGameStatus] = useState();
    const [scores, setScores] = useState({
            hit: 0,
            miss: 0
        }
    );

    let timer = null;
    const removeCurrentNumFromPool = () => {
        const filterPool = pool.filter(num => num !== currentNumber)
        setPool(filterPool);
    }

    const setCurrentNumberStatus = (status) => {
        const currentLetter = alphabet[currentNumber];
        setScores({...scores, [status]: scores[status] + 1})

        setAlphabetMap({...alphabetMap, [currentLetter]: {...alphabetMap[currentLetter], status: status}})
        console.log({...alphabetMap, [currentLetter]: {...alphabetMap[currentLetter], status: status}})
    }

    useEffect(() => {
        if (difficultyLevel && gameStatus === 'started') {
            timer = setTimeout(() => {
                removeCurrentNumFromPool();
                setCurrentNumberStatus('miss');
            }, difficultyLevel.time);
            return () => clearTimeout(timer);
        }
    }, [currentNumber, gameStatus]);

    const handleSubmit = (letter) => {
        if (currentNumber === alphabetMap[letter].num) {
            setCurrentNumberStatus('hit');
            clearTimeout(timer);
            removeCurrentNumFromPool()
        } else {
            setCurrentNumberStatus('miss');
            clearTimeout(timer);
            removeCurrentNumFromPool()
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
                        <AlphabetTable alphabetMap={alphabetMap} />
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
