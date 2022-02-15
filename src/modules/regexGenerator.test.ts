import { getGlobalLettersRegex } from './regexGenerator'

test('should return empty regexp if inoput array is empty', () => {
    const output = getGlobalLettersRegex([]);
    expect(output).toStrictEqual(new RegExp('.*'));
})

test('should return valid regexp when passing inout array', () => {
    const testInput = ['a', 'e', 'i']
    const output = getGlobalLettersRegex(testInput)
    const expectedRegExp = /[aei]/
    expect(output).toStrictEqual(new RegExp(expectedRegExp));
})