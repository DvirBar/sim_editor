import { GenObj, ObjOfObjects } from "../interfaces/objects";

export const removeFromObj = (obj: GenObj, key: string) => {
    const newObj: GenObj = {}
    
    for(let objKey in obj) {
        if(objKey !== key) {
            newObj[objKey] = obj[objKey]
        }
    }

    return newObj
}

export const objectTOArray = (obj: ObjOfObjects, keyName?: string) => {
    let arr = []
    
    for(let key in obj) {
        let objItem: GenObj
        
        if(keyName) {
            objItem = {
                [keyName]: key,
                ...obj[key]
            }
        }
        
        else {
            objItem = obj[key]
        }

        arr.push(objItem)
    }

    return arr
}
