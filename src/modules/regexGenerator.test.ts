import { getGlobalIncludeLettersRegex, getGlobalLettersRegex, getPositionalLettersRegexp } from './regexGenerator'
import { ObjectLettersStatuses } from './wordsSearch';

test('should return empty regexp if inoput array is empty', () => {
    const output = getGlobalLettersRegex([]);
    expect(output).toStrictEqual([]);
})

test('should return valid regexp when passing inout array', () => {
    const testInput = ['a', 'e', 'i']
    const output = getGlobalLettersRegex(testInput)
    const expectedRegExp = /[aei]/
    expect(output).toStrictEqual([new RegExp(expectedRegExp)]);
})

test('given no inlcude letters to getGlobalIncludeLettersRegex', () => {
    const inputLetters: string[] = [];
    const expectedOutput = [new RegExp('.*')]
    expect(getGlobalIncludeLettersRegex(inputLetters)).toStrictEqual(expectedOutput)
})


test('given some inlcude letters to getGlobalIncludeLettersRegex', () => {
    const inputLetters: string[] = ['e', 'i', 'o'];
    const expectedOutput = [new RegExp(/e/), new RegExp(/i/), new RegExp(/o/)]
    expect(getGlobalIncludeLettersRegex(inputLetters)).toStrictEqual(expectedOutput)
})

test('no Y or G input to positionalLettersRegExp', () => {
    const input: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'B' },
        { letter: 'e', status: 'B' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'B' },
        { letter: 'u', status: 'B' }
    ]
    const [includeRegExp, excludeRegExp] = getPositionalLettersRegexp(input)
    expect(includeRegExp).toEqual([])
    expect(excludeRegExp).toEqual([])
})

test('some Y input to positionalLettersRegExp', () => {
    const input: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'B' },
        { letter: 'e', status: 'Y' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'Y' },
        { letter: 'u', status: 'B' }
    ]
    const [includeRegExp, excludeRegExp] = getPositionalLettersRegexp(input)
    expect(excludeRegExp).toEqual([new RegExp('^\\we\\w\\w\\w$'), new RegExp('^\\w\\w\\wo\\w$')])
    expect(includeRegExp).toEqual([])
})

test('some G input to positionalLettersRegExp', () => {
    const input: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'G' },
        { letter: 'e', status: 'B' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'B' },
        { letter: 'u', status: 'G' }
    ]
    const [includeRegExp, excludeRegExp] = getPositionalLettersRegexp(input)
    expect(includeRegExp).toEqual([new RegExp('^a\\w\\w\\w\\w$'), new RegExp('^\\w\\w\\w\\wu$')])
    expect(excludeRegExp).toEqual([])
})