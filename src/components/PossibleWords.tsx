import Words from "./Words";

type PossibleWordsProps = { handleClick: Function, words: string[] }

const PossibleWords = (props: PossibleWordsProps) => {
    const fetchWords = () => {
        console.log('inner click handler for show words')
        props.handleClick();
    }
    return (
        <>
            <button onClick={fetchWords} id="showWords">Show Words</button>
            <div>Possible Words</div>
            <Words words={props.words} />
        </>
    )
}

export default PossibleWords;