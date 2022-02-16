type WordProps = { words: string[] }
const Words = ({ words }: WordProps) => {

    const list = words.map((word: any) => <div className="word">{word}</div>)
    return (
        <div className="words">
            <span>Total words <span id="countOfResults">{words.length}</span></span>
            {list}
        </div>
    )
}

export default Words