export const get = (object, path, defaultValue) => {
    const paths = path.split('.');
    let getter = object;
    if(typeof object === 'object'){
        paths.forEach(key => {
            if (getter !== defaultValue && getter[key]) {
                getter = getter[key];
                return;
            }
            getter = defaultValue;
        });
        return getter;
    }
    return defaultValue;
};

export const cloneArray = (array) => {
    if (Array.isArray(array)) {
        return array.map(item => {
            if (Array.isArray(item)) return cloneArray(item);
            if (typeof item === 'object' && !(item instanceof Date)) return cloneObject(item);
            return item;
        });
    }
    return array;
};

export const cloneObject = (object) => {
    const results = {};
    Object.keys(object).forEach((key) => {
        const data = cloneArray(object[key]);
        if (
            typeof object[key] === 'object' &&
            !Array.isArray(object[key]) &&
            !(object[key] instanceof Date)
        ) {
            results[key] = cloneObject(data);
            return;
        }
        results[key] = data;
    });
    return results;
};

export const hasDifferentKeysLength = (sourceObject, compareObject) => {
    return Object.keys(sourceObject).length !== Object.keys(compareObject).length;
};

export const isNotEqualArray = (sourceArray, compareArray) => {
    if (sourceArray.length !== compareArray.length) return true;
    let result = false;
    sourceArray.forEach((value, index) => {
        if (isNotEqualValue(compareArray[index], value)) result = true;
    });
    return result;
};

export const isNotEqualValue = (sourceValue, compareValue) => {
    const sourceValueType = typeof sourceValue;
    const compareValueType = typeof compareValue;
    if (sourceValueType !== compareValueType || (sourceValueType !== 'object') && sourceValue !== compareValue) return true;
    if (Array.isArray(sourceValue)) {
        return isNotEqualArray(sourceValue, compareValue);
    }
    if (sourceValueType === 'object' && isNotEqualObject(sourceValue, compareValue)) return true;
};

export const isNotEqualObject = (sourceObject, compareObject) => {
    if (hasDifferentKeysLength(sourceObject, compareObject)) return true;
    const objectKeys = Object.keys(sourceObject);
    let result = false;
    let counter = 0;
    while(!result && objectKeys.length >= counter ){
        const key = objectKeys[counter];
        if(isNotEqualValue(sourceObject[key], compareObject[key])) result = true;
        counter += 1;
    }
    return result;
};