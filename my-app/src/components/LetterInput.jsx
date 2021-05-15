import {Form} from "react-bootstrap";
import {useState} from "react";

const LetterInput = ({ onSubmit }) => {
    const [letter, setLetter] = useState('');

    const handleKeyPress = (event) => {
        if (event.charCode==13){
            event.preventDefault();
            onSubmit(letter);
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control onChange={(event) => setLetter(event.target.value)}
                              value={letter}
                              onKeyPress={handleKeyPress}
                              placeholder="Input Letter"
                              type="text"/>
            </Form.Group>
        </Form>
    )
}

export default LetterInput;