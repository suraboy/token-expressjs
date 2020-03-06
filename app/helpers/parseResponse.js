const toSnakeCase = (string) => {
    return string.replace(/[\w]([A-Z])/g, (m) => {
        return m[0] + "_" + m[1];
    }).toLowerCase();
}

const deepIterator = (target) => {
    if (typeof target === 'object') {
        for (const key in target) {
            const snakeKey = toSnakeCase(key)
            const value = target[key]
            delete target[key]
            target[snakeKey] = value
            deepIterator(target[key]);
        }
    }
    return target
}



exports.parseResponse = (response) => {
    return deepIterator(response)
}
