import { useEffect, useState } from "react";

const RandomNumber = ({ pool, onChange }) => {
    const [currentNumber, setCurrentNumber] = useState();

    useEffect(() => {
        setCurrentNumber(getRandomItemFromArray(pool))
    }, [pool]);

    useEffect(() => {
        if (onChange) onChange(currentNumber);
    }, [currentNumber])

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * (max + 1))
    }

    const getRandomItemFromArray = (arr) => {
        return arr[getRandomNumber(arr.length)];
    }

    return (
        <div>
            <span>{currentNumber}</span>
        </div>
    )
}

export default RandomNumber;