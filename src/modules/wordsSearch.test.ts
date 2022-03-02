import { findValidWords, getAllPositionalRegExps, getExcludeLetters, getIncludeLetters, ObjectLettersStatuses } from './wordsSearch'

test('test getAllPositionalRegExps happy day', () => {
    const input1: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'G' },
        { letter: 'e', status: 'B' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'B' },
        { letter: 'u', status: 'Y' }
    ]
    const input2: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'B' },
        { letter: 'e', status: 'G' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'Y' },
        { letter: 'u', status: 'B' }
    ]

    const [outputIncludes, outputExxcludes] = getAllPositionalRegExps(input1, input2);
    expect(outputIncludes).toStrictEqual([new RegExp('^a\\w\\w\\w\\w$'), new RegExp('^\\we\\w\\w\\w$')])
    expect(outputExxcludes).toStrictEqual([new RegExp('^\\w\\w\\w\\wu$'), new RegExp('^\\w\\w\\wo\\w$')])

})

test('test getAllPositionalRegExps rainy day', () => {
    const inputAllYellows: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'Y' },
        { letter: 'e', status: 'Y' },
        { letter: 'i', status: 'Y' },
        { letter: 'o', status: 'Y' },
        { letter: 'u', status: 'Y' }
    ]
    const inputAllGreens: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'G' },
        { letter: 'e', status: 'G' },
        { letter: 'i', status: 'G' },
        { letter: 'o', status: 'G' },
        { letter: 'u', status: 'G' }
    ]
    const inputAllBlacks: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'B' },
        { letter: 'e', status: 'B' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'B' },
        { letter: 'u', status: 'B' }
    ]
    const regexpsOfAllPositionalLetters = [
        /^a\w\w\w\w$/,
        /^\we\w\w\w$/,
        /^\w\wi\w\w$/,
        /^\w\w\wo\w$/,
        /^\w\w\w\wu$/
    ]
    expect(getAllPositionalRegExps(inputAllYellows)).toStrictEqual([[], regexpsOfAllPositionalLetters]);
    expect(getAllPositionalRegExps(inputAllGreens)).toStrictEqual([regexpsOfAllPositionalLetters, []]);
    expect(getAllPositionalRegExps(inputAllBlacks)).toStrictEqual([[], []]);
})

test('tests getIncludeLetters', () => {
    const input1: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'G' },
        { letter: 'e', status: 'B' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'B' },
        { letter: 'u', status: 'Y' }
    ]
    const input2: ObjectLettersStatuses[] = [
        { letter: 'a', status: 'B' },
        { letter: 'e', status: 'G' },
        { letter: 'i', status: 'B' },
        { letter: 'o', status: 'Y' },
        { letter: 'u', status: 'B' }
    ]

    expect(getIncludeLetters(input1)).toStrictEqual(['a', 'u'])
    expect(getIncludeLetters(input2)).toStrictEqual(['e', 'o'])
    expect(getExcludeLetters(input1)).toStrictEqual(['e', 'i', 'o'])
    expect(getExcludeLetters(input2)).toStrictEqual(['a', 'i', 'u'])
})

test('findValidWords happy scenrio 01', () => {
    expect(findValidWords(
        ['a', 'e', 'i', 'o', 'u'],
        ['B', 'B', 'B', 'B', 'B']
    ).length).toBe(53);
})

test('findValidWords happy scenrio 02', () => {
    expect(findValidWords(
        ['a', 'e', 'u', 'i', 'o'],
        ['B', 'B', 'Y', 'B', 'B']
    ).length).toBe(476);
})

test('findValidWords happy scenrio 03', () => {
    expect(findValidWords(
        ['p', 'a', 'c', 'e', 'r', 'm', 'i', 'n', 'd', 's'],
        ['Y', 'B', 'B', 'G', 'Y', 'B', 'B', 'B', 'B', 'B']
    ).length).toBe(5);
})

test('findValidWords happy scenrio 04', () => {
    expect(findValidWords(
        ['p', 'a', 'c', 'e', 'r', 'm', 'i', 'n', 'd', 's', 'r', 'e', 'p', 'e', 'l'],
        ['Y', 'B', 'B', 'G', 'Y', 'B', 'B', 'B', 'B', 'B', 'G', 'Y', 'G', 'G', 'B']
    ).length).toBe(2);
})