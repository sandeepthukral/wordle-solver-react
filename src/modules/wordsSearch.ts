import words from '../resources/words.json'
type Letters = string[]
type Statuses = string[]
type ObjectLettersStatuses = {letter: string, status: string}

const mergeArrays = (a: string[], b: string[]) => {
    return a.map((a, index) => {
        let obj = {letter: '', status: ''}
        obj.letter = a
        obj.status = b[index]
        return obj
    })
}

const getIncludeLetters = ((ab: ObjectLettersStatuses[]) => ab.filter(ab => ab.status==='G' || ab.status==='Y').map(ab => ab.letter))
const getExcludeLetters = ((ab: ObjectLettersStatuses[]) => ab.filter(ab => ab.status==='B').map(ab => ab.letter))

export const findValidWords = (letters: Letters, statuses: Statuses) => {

    // slice a and b into 6 arrays of 5 items each
    const letters1 = letters.slice(0, 5)
    const statuses1 = statuses.slice(0, 5)
    const letters2 = letters.slice(5, 10)
    const statuses2 = statuses.slice(5, 10)

    // join an and bn into abn, where each item there is {letter: a, status: b}
    const letterstatuses1 = mergeArrays(letters1, statuses1);
    const letterstatuses2 = mergeArrays(letters2, statuses2);

    // collect all words with status G or Y as includeLetters
    const includeLetters = [...getIncludeLetters(letterstatuses1), ...getIncludeLetters(letterstatuses2)]
    const includeRegexp = new RegExp(`[${includeLetters.join('')}]`)
    
    // collect all words with status B as excludeLetters
    const excludeLetters = [...getExcludeLetters(letterstatuses1), ...getExcludeLetters(letterstatuses2)]
    const excludeRegexp = new RegExp(`[${excludeLetters.join('')}]`)
    
    const words1 = words.filter(word => includeRegexp.test(word)).filter(word => !excludeRegexp.test(word))
    console.log(words1);
    return words1;
}