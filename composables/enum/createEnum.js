export function createEnum(objectsArray) {
    const enumObject = {};

    for (const obj of objectsArray) {
        const { key, value } = obj;
        enumObject[key.toLowerCase()] = value;
    }

    enumObject.list = Object.keys(enumObject).map((key) => ({
        key: key,
        value: enumObject[key],
    }));

    enumObject.getKey = function (value) {
        const key = Object.keys(enumObject).find((key) => enumObject[key] === value);
        return key !== undefined ? key : " ";
    };

    enumObject.getValue = function (key) {
        return enumObject[key.toLowerCase()] !== undefined ? enumObject[key.toLowerCase()] : " ";
    };

    return enumObject;
}
