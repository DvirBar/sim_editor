export function sliceString(str: string, fragment: string) {
    const fragIndex = str.indexOf(fragment)

    if(fragIndex === -1) {
        throw new Error(`Could not find ${fragment} in ${str}`)
    }
    const endOfFragIndex = fragIndex + fragment.length
    const lastIndexOfStr = str.length

    const newStr = str.slice(0, fragIndex) + str.slice(endOfFragIndex, lastIndexOfStr)

    return newStr
}