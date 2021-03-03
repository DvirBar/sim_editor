import { sliceString } from '../utils'

describe('test sliceString function', () => {
    const testString: string = 'myTestString'

    it('should slice string properly ', () => {
        // Slice at the begining
        expect(sliceString(testString, 'my')).toBe('TestString')

        // Slice at the middle
        expect(sliceString(testString, 'Test')).toBe('myString')

        // Slice at the end
        expect(sliceString(testString, 'String')).toBe('myTest')
    })

    it('should throw an error if fragment not found in string', () => {
        const falseString = "else"
        
        expect(() => sliceString(testString, falseString))
            .toThrow(`Could not find ${falseString} in ${testString}`)
    })
}) 