import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetMap = [...alphabet].reduce((prev, curr) => {
    prev[curr] = alphabet.indexOf(curr);
    return prev;
}, {});

function App() {
    return (
        <Container>
            <Row>
                <Col lg={9}>
                    <Row>
                        <div>
                            <span>Easy</span>
                            <span>Medium</span>
                            <span>Hard</span>
                        </div>
                    </Row>
                    <Row>
                        <Button variant="primary">Start</Button>
                    </Row>
                    <Row>
                        <span>17</span>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group>
                                <Form.Control placeholder="Input Letter" type="text"/>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <div className="alphabet-game__table">
                            {Object.keys(alphabetMap).map(letter => {
                                return <div>
                                    {`${letter} (${alphabetMap[letter]})`}
                                </div>
                            })}
                        </div>
                    </Row>
                </Col>
                <Col lg={3}>
                    <Row><span>Score</span> </Row>
                    <Row><span>Hit:</span></Row>
                    <Row><span>Miss:</span></Row>
                    <Row><span>Left:</span></Row>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
