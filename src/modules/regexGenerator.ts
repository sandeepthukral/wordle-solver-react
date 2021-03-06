import { ObjectLettersStatuses } from "./wordsSearch";

export const getGlobalLettersRegex = (letters: string[]) => {
    // console.log(`[getGlobalLettersRegex] incoming letters ${letters}`);
    if (!letters.length) return []
    return [new RegExp(`[${letters.join('')}]`)]
}

export const getGlobalIncludeLettersRegex = (letters: string[]) => {
    if (!letters.length) return [new RegExp('.*')]
    let regExps: RegExp[] = []
    letters.forEach(letter => regExps.push(new RegExp(`${letter}`)))
    return regExps;
}

export const getPositionalLettersRegexp = (letterGroups: ObjectLettersStatuses[]) => {
    const positionalLetterIncludeRegexps: RegExp[] = []
    const positionalLetterExcludeRegexps: RegExp[] = []
    const regExpWords = Array(5).fill('\\w')
    letterGroups.forEach((letterGroup, index) => {
        const localRegExpWords = [...regExpWords]
        if (letterGroup.status === 'Y') {
            localRegExpWords[index] = letterGroup.letter;
            positionalLetterExcludeRegexps.push(new RegExp(`^${localRegExpWords.join('')}$`))
        }
        if (letterGroup.status === 'G') {
            localRegExpWords[index] = letterGroup.letter;
            positionalLetterIncludeRegexps.push(new RegExp(`^${localRegExpWords.join('')}$`))
        }
    });
    return [positionalLetterIncludeRegexps, positionalLetterExcludeRegexps]
}