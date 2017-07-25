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

export const hasDiffrentKeysLength = (srcObject, compareObject) => {
    return Object.keys(srcObject).length !== Object.keys(compareObject).length;
};

export const isNotEqualArray = (srcArray, compareArray) => {
    if (srcArray.length !== compareArray.length) return true;
    let result = false;
    srcArray.forEach((value, index) => {
        if (isNotEqualValue(compareArray[index], value)) result = true;
    });
    return result;
};

export const isNotEqualValue = (srcValue, compareValue) => {
    const srcValueType = typeof srcValue;
    const compareValueType = typeof compareValue;
    if (srcValueType !== compareValueType || (srcValueType !== 'object') && srcValue !== compareValue) return true;
    if (Array.isArray(srcValue)) {
        return isNotEqualArray(srcValue, compareValue);
    }
    if (srcValueType === 'object' && isNotEqualObject(srcValue, compareValue)) return true;
};

export const isNotEqualObject = (srcObject, compareObject) => {
    if (hasDiffrentKeysLength(srcObject, compareObject)) return true;
    let result = false;
    Object.keys(srcObject).forEach((key) => {
        if(isNotEqualValue(srcObject[key], compareObject[key])) result = true;
    });
    return result;
};