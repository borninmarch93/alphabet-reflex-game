import { useState } from "react";

const DifficultySelector = ({ onChange }) => {
    const [selected, setSelected] = useState();

    const difficultyHandler = (name) => {
        if (onChange) onChange(name);
        setSelected(name);
    }

    const difficultyLevels = [
        { label: 'Easy', name: 'easy' },
        { label: 'Medium', name: 'medium'},
        { label: 'Hard', name: 'hard'},
    ]

    return (
        <div className="difficulty-level">
            {difficultyLevels.map((item, index) => {
                return <div className={`difficulty-level__item ${selected === item.name && 'active'}`}
                            key={index}
                            onClick={() => difficultyHandler(item.name)}>
                    <span>{item.label}</span>
                </div>
            })}
        </div>
    )
}

export default DifficultySelector;