export const mergeArrays = (a: string[], b: string[]) => {
    return a.map((a, index) => {
        let obj = { letter: '', status: '' }
        obj.letter = a
        obj.status = b[index]
        return obj
    })
}