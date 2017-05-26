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