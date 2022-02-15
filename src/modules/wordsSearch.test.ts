import { getAllPositionalRegExps, ObjectLettersStatuses } from './wordsSearch'

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