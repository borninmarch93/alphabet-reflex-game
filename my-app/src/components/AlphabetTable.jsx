import classNames from "classnames";

const AlphabetTable = ({ alphabetMap }) => {
    const getClasses = (letter) => {
        return classNames(
            'alphabet-game-table__item',
            alphabetMap[letter].status === 'hit' ? 'hit' : '',
            alphabetMap[letter].status === 'miss' ? 'miss' : ''
        );
    }

    return (
        <div className="alphabet-game-table">
            {Object.keys(alphabetMap).map(letter => {
                return <div className={getClasses(letter)}>
                    {`${letter} (${alphabetMap[letter].num})`}
                </div>
            })}
        </div>
    )
}

export default AlphabetTable;