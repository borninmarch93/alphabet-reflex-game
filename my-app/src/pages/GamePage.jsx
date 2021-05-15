import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import queryString from "query-string";
import GameStatus from "../components/GameStatus";
import RandomNumber from "../components/RandomNumber";
import LetterInput from "../components/LetterInput";
import AlphabetTable from "../components/AlphabetTable";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const difficultyLevels = {
    easy: {time: 5000},
    medium: {time: 3500},
    hard: {time: 2000},
}

const getInitAlphabetMap = () => {
    return [...alphabet].reduce((prev, curr) => {
        prev[curr] = {num: alphabet.indexOf(curr)};
        return prev;
    }, {})
}

const getInitPool = () => {
    return [...Array(26).keys()];
}

const getInitScores = () => {
    return {
        hit: 0,
        miss: 0
    };
}

const GamePage = ({location}) => {
    const [alphabetMap, setAlphabetMap] = useState(getInitAlphabetMap());
    const [pool, setPool] = useState(getInitPool());
    const [currentNumber, setCurrentNumber] = useState();
    const [difficultyLevel, setDifficultyLevel] = useState();
    const [gameStatus, setGameStatus] = useState();
    const [scores, setScores] = useState(getInitScores());

    let timer = null;

    useEffect(() => {
        const {level} = queryString.parse(location.search);
        setDifficultyLevel(difficultyLevels[level]);
    }, [])

    useEffect(() => {
        if (difficultyLevel && gameStatus === 'started') {
            timer = setTimeout(() => {
                removeCurrentNumFromPool();
                setCurrentNumberStatus('miss');
            }, difficultyLevel.time);
            return () => clearTimeout(timer);
        }
    }, [currentNumber, gameStatus]);

    const gameStatusChangeHandler = (status) => {
        if (status === 'stopped') {
            restartGame();
        }
        setGameStatus(status);
    }

    const restartGame = () => {
        setAlphabetMap(getInitAlphabetMap());
        setPool(getInitPool());
        setScores(getInitScores());
    }

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

    const handleSubmit = (letter) => {
        if (alphabetMap[letter] && currentNumber === alphabetMap[letter].num) {
            setCurrentNumberStatus('hit');
            clearTimeout(timer);
            removeCurrentNumFromPool()
        } else {
            setCurrentNumberStatus('miss');
            clearTimeout(timer);
            removeCurrentNumFromPool()
        }
    }

    return (
        <Container>
            <Row className="alphabet-game alphabet-game__item">
                <Col lg={10}>
                    <Row>
                        <GameStatus onChange={gameStatusChangeHandler}/>
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
                        <AlphabetTable alphabetMap={alphabetMap}/>
                    </Row>
                </Col>
                <Col lg={2} className="score">
                    <Row><span className="score__title">Score</span></Row>
                    <Row>
                        <Col className="score__hit">Hit: </Col>
                        <Col> {scores.hit}</Col>
                    </Row>
                    <Row>
                        <Col className="score__miss">Miss: </Col>
                        <Col> {scores.miss}</Col></Row>
                    <Row>
                        <Col className="score__left">Left: </Col>
                        <Col> {pool.length}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage;