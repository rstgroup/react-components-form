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
