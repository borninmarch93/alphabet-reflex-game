import { useState } from "react";

const DifficultySelector = ({ onChange }) => {
    const [selected, setSelected] = useState();

    const changeHandler = (item) => {
        if (onChange) onChange(item);
        setSelected(item.name);
    }

    const difficultyLevels = [
        { label: 'Easy', name: 'easy', time: 5000 },
        { label: 'Medium', name: 'medium', time: 3000 },
        { label: 'Hard', name: 'hard', time: 1000}
    ]

    return (
        <div className="difficulty-level">
            {difficultyLevels.map((item, index) => {
                return <div className={`difficulty-level__item ${selected === item.name && 'active'}`}
                            key={index}
                            onClick={() => changeHandler(item)}>
                    <span>{item.label}</span>
                </div>
            })}
        </div>
    )
}

export default DifficultySelector;