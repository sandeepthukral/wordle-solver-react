import words from '../resources/words.json'
import { getGlobalIncludeLettersRegex, getGlobalLettersRegex, getPositionalLettersRegexp } from './regexGenerator'
import { mergeArrays } from '../utils/utils'
type Letters = string[]
type Statuses = string[]
export type ObjectLettersStatuses = { letter: string, status: string }

const includeStatuses = ['Y', 'G'];
const excludeStatuses = ['B'];

export const getIncludeLetters = ((ab: ObjectLettersStatuses[]) =>
    ab.filter(ab => includeStatuses.includes(ab.status)).map(ab => ab.letter))
export const getExcludeLetters = ((ab: ObjectLettersStatuses[]) =>
    ab.filter(ab => excludeStatuses.includes(ab.status)).map(ab => ab.letter))

export const findValidWords = (letters: Letters, statuses: Statuses) => {

    // slice a and b into 6 arrays of 5 items each
    const letters1 = letters.slice(0, 5)
    const statuses1 = statuses.slice(0, 5)
    const letters2 = letters.slice(5, 10)
    const statuses2 = statuses.slice(5, 10)
    const letters3 = letters.slice(10, 15)
    const statuses3 = statuses.slice(10, 15)
    const letters4 = letters.slice(15, 20)
    const statuses4 = statuses.slice(15, 20)
    const letters5 = letters.slice(20, 25)
    const statuses5 = statuses.slice(20, 25)
    const letters6 = letters.slice(25, 30)
    const statuses6 = statuses.slice(25, 30)

    // join an and bn into abn, where each item there is {letter: a, status: b}
    const letterstatuses1 = mergeArrays(letters1, statuses1);
    const letterstatuses2 = mergeArrays(letters2, statuses2);
    const letterstatuses3 = mergeArrays(letters3, statuses3);
    const letterstatuses4 = mergeArrays(letters4, statuses4);
    const letterstatuses5 = mergeArrays(letters5, statuses5);
    const letterstatuses6 = mergeArrays(letters6, statuses6);

    const lettersStatusess = [letterstatuses1, letterstatuses2, letterstatuses3, letterstatuses4, letterstatuses5, letterstatuses6]

    // collect all words with status G or Y as includeLetters
    const includeLetters = [
        ...getIncludeLetters(letterstatuses1),
        ...getIncludeLetters(letterstatuses2),
        ...getIncludeLetters(letterstatuses3),
        ...getIncludeLetters(letterstatuses4),
        ...getIncludeLetters(letterstatuses5),
        ...getIncludeLetters(letterstatuses6),
    ]
    console.log(`includeLetters ${includeLetters}`);
    const includeRedExps = getGlobalIncludeLettersRegex(includeLetters)

    // collect all words with status B as excludeLetters
    let excludeLetters = [
        ...getExcludeLetters(letterstatuses1),
        ...getExcludeLetters(letterstatuses2),
        ...getExcludeLetters(letterstatuses3),
        ...getExcludeLetters(letterstatuses4),
        ...getExcludeLetters(letterstatuses5),
        ...getExcludeLetters(letterstatuses6),
    ]

    // any letter included should be removed from the excluded letters array
    excludeLetters = excludeLetters.filter(ele => !includeLetters.includes(ele))
    console.log(`excludeLetters ${excludeLetters}`);
    const excludeRegexp = getGlobalLettersRegex(excludeLetters)
    console.log(` exclude regexp ${excludeRegexp}`);

    const [includePositionalRegExps, excludePositionalRegExps] = getAllPositionalRegExps(letterstatuses1, letterstatuses2, letterstatuses3, letterstatuses4, letterstatuses5, letterstatuses6)
    console.log(`includePositionalRegExps ${includePositionalRegExps}`);
    console.log(`excludePositionalRegExps ${excludePositionalRegExps}`);

    let words1 = words.filter(word => !excludeRegexp.test(word))
    words1 = applyAllIncludeRegExps(includeRedExps, words1);
    words1 = applyAllIncludeRegExps(includePositionalRegExps, words1);
    words1 = applyAllExcludeRegExps(excludePositionalRegExps, words1);

    return words1;
}

export const getAllPositionalRegExps = (...letterObjectInputs: ObjectLettersStatuses[][]) => {
    let includeRegExps: RegExp[] = []
    let excludeRegExps: RegExp[] = []
    letterObjectInputs.map((letterObject: ObjectLettersStatuses[]) => {
        const [includes, excludes] = getPositionalLettersRegexp(letterObject)
        includeRegExps.push(...includes)
        excludeRegExps.push(...excludes)
    })
    return [includeRegExps, excludeRegExps]
}

export const applyAllIncludeRegExps = (res: RegExp[], words: string[]) => {
    return res.reduce((final, re) => { return final.filter(finalWord => re.test(finalWord)) }, words)
}

export const applyAllExcludeRegExps = (res: RegExp[], words: string[]) => {
    return res.reduce((final, re) => { return final.filter(finalWord => !re.test(finalWord)) }, words)
}