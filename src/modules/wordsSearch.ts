import allPossibleWords from '../resources/words.json'
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
    const lettersStatuses = getLetterStatuses(letters, statuses);

    // collect all words with status G or Y as includeLetters
    const includeLetters = [
        ...getIncludeLetters(lettersStatuses[0]),
        ...getIncludeLetters(lettersStatuses[1]),
        ...getIncludeLetters(lettersStatuses[2]),
        ...getIncludeLetters(lettersStatuses[3]),
        ...getIncludeLetters(lettersStatuses[4]),
        ...getIncludeLetters(lettersStatuses[5]),
    ]
    const includeRedExps = getGlobalIncludeLettersRegex(includeLetters)

    // collect all words with status B as excludeLetters
    let excludeLetters = [
        ...getExcludeLetters(lettersStatuses[0]),
        ...getExcludeLetters(lettersStatuses[1]),
        ...getExcludeLetters(lettersStatuses[2]),
        ...getExcludeLetters(lettersStatuses[3]),
        ...getExcludeLetters(lettersStatuses[4]),
        ...getExcludeLetters(lettersStatuses[5]),
    ]

    // any letter included should be removed from the excluded letters array
    excludeLetters = excludeLetters.filter(ele => !includeLetters.includes(ele))
    const excludeRegexps = getGlobalLettersRegex(excludeLetters)

    const [includePositionalRegExps, excludePositionalRegExps] =
        getAllPositionalRegExps(
            lettersStatuses[0],
            lettersStatuses[1],
            lettersStatuses[2],
            lettersStatuses[3],
            lettersStatuses[4],
            lettersStatuses[5])

    // now apply the regula expressions and filter out valid words
    let validWords = applyAllExcludeRegExps(excludeRegexps, allPossibleWords);
    validWords = applyAllIncludeRegExps(includeRedExps, validWords);
    validWords = applyAllIncludeRegExps(includePositionalRegExps, validWords);
    validWords = applyAllExcludeRegExps(excludePositionalRegExps, validWords);

    return validWords;
}

const getLetterStatuses = (letters: Letters, statuses: Statuses) => {
    const lettersSlices = [
        letters.slice(0, 5),
        letters.slice(5, 10),
        letters.slice(10, 15),
        letters.slice(15, 20),
        letters.slice(20, 25),
        letters.slice(25, 30),
    ]

    const statusesSlices = [
        statuses.slice(0, 5),
        statuses.slice(5, 10),
        statuses.slice(10, 15),
        statuses.slice(15, 20),
        statuses.slice(20, 25),
        statuses.slice(25, 30),
    ]

    const lettersStatuses = [
        mergeArrays(lettersSlices[0], statusesSlices[0]),
        mergeArrays(lettersSlices[1], statusesSlices[1]),
        mergeArrays(lettersSlices[2], statusesSlices[2]),
        mergeArrays(lettersSlices[3], statusesSlices[3]),
        mergeArrays(lettersSlices[4], statusesSlices[4]),
        mergeArrays(lettersSlices[5], statusesSlices[5]),
    ]

    return lettersStatuses;
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
    if (res.length === 0) return words;
    return res.reduce((final, re) => { return final.filter(finalWord => re.test(finalWord)) }, words)
}

export const applyAllExcludeRegExps = (res: RegExp[], words: string[]) => {
    if (res.length === 0) return words;
    return res.reduce((final, re) => { return final.filter(finalWord => !re.test(finalWord)) }, words)
}