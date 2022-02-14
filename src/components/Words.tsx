type WordProps = {words: string[]}
const Words = ({words}: WordProps) => {
    
    const list = words.map((word: any) => <div className="word">{word}</div>)
    return (
        <div className="words">
        Total words {words.length}
        {list}
        </div>
    )
}

export default Words