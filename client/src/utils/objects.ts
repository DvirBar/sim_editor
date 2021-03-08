import { GenObj } from "../interfaces/objects";

export const removeFromObj = (obj: GenObj, key: string) => {
    const newObj: GenObj = {}
    
    for(let objKey in obj) {
        if(objKey !== key) {
            newObj[objKey] = obj[objKey]
        }
    }

    return newObj
}
