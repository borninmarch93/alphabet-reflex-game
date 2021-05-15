import { useState } from "react";
import { Link } from "react-router-dom";

const DifficultySelector = ({ onChange }) => {
    const [selected, setSelected] = useState();

    const changeHandler = (item) => {
        if (onChange) onChange(item);
        setSelected(item.name);
    }

    const difficultyLevels = [
        { label: 'Easy', name: 'easy' },
        { label: 'Medium', name: 'medium' },
        { label: 'Hard', name: 'hard' }
    ]

    return (
        <div className="difficulty-level">
            {difficultyLevels.map((item, index) => {
                return <Link to={`/game?level=${item.name}`} key={index}>
                    <div className={`difficulty-level__item ${selected === item.name && 'active'}`}
                            onClick={() => changeHandler(item)}>
                    <span>{item.label}</span>
                </div></Link>
            })}
        </div>
    )
}

export default DifficultySelector;