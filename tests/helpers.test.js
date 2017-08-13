import { get, cloneObject, cloneArray, isNotEqualObject } from '../src/helpers';

describe('helpers', () => {
    describe('get', () => {
        const valueABC = 'testABC';
        const valueBC = 'testBC';
        const test = {
            a: {
                b: {
                    c: valueABC,
                },
            },
            b: {
                c: valueBC,
            },
        };
        const test2 = 'test';
        it('should get property from object', () => {
            expect(get(test, 'a.b.c')).toBe(valueABC);
        });
        it('should return default value', () => {
            expect(get(test, 'a.b.d', 'test')).toBe('test');
        });
        it('should return default value if property not exists', () => {
            expect(get(test, 'b', 'test').c).toBe(valueBC);
        });
        it('should return default value if first attribute isnt object', () => {
            expect(get(test2, 'b', 'test')).toBe('test');
        });
    });

    describe('cloneArray', () => {
        const array = ['test', 'test1', 'test2'];
        const arrayOfObjects = [{ test: 'test1' }, new Date()];
        const arrayOfArrays = [array, arrayOfObjects];
        it('should clone simple array', () => {
            const clonedArray = cloneArray(array);
            expect(clonedArray).not.toBe(array);
            expect(clonedArray).toEqual(array);
        });
        it('should clone array of objects', () => {
            const clonedArray = cloneArray(arrayOfObjects);
            expect(clonedArray).not.toBe(arrayOfObjects);
            expect(clonedArray).toEqual(arrayOfObjects);
        });
        it('should clone array of arrays', () => {
            const clonedArray = cloneArray(arrayOfArrays);
            expect(clonedArray).not.toBe(arrayOfArrays);
            expect(clonedArray).toEqual(arrayOfArrays);
        });
    });

    describe('cloneObject', () => {
        const object = { a: 'test', b: 'test1', c: 'test2' };
        const objectWithObjects = { a: { test: 'test1' }, b: new Date() };
        const objectWithArrays = { a: ['test', 'test2'], b: objectWithObjects };
        it('should clone simple object', () => {
            const clonedObject = cloneObject(object);
            expect(clonedObject).not.toBe(object);
            expect(clonedObject).toEqual(object);
        });
        it('should clone object with objects', () => {
            const clonedObject = cloneObject(objectWithObjects);
            expect(clonedObject).not.toBe(objectWithObjects);
            expect(clonedObject).toEqual(objectWithObjects);
        });
        it('should clone object with arrays', () => {
            const clonedObject = cloneObject(objectWithArrays);
            expect(clonedObject).not.toBe(objectWithArrays);
            expect(clonedObject).toEqual(objectWithArrays);
        });
    });

    describe('isNotEqualObject', () => {
        it('should return false when one of objects is null', () => {
            const srcObject = null;
            const compareObject = { foo: 'bar', foo2: 'bar2' };
            expect(isNotEqualObject(srcObject, compareObject)).toBeFalsy();
        });
        it('should return true when objects has diffrent length', () => {
            const srcObject = { foo: 'bar' };
            const compareObject = { foo: 'bar', foo2: 'bar2' };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });
        it('should return true when objects keys has diffrent types', () => {
            const srcObject = { foo: 'bar' };
            const compareObject = { foo: true };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });
        it('should return true when objects keys has diffrent values', () => {
            const srcObject = { foo: 'bar' };
            const compareObject = { foo: 'bar2' };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });
        it('should return true when objects keys are objects and has diffrent values', () => {
            const srcObject = {
                foo: {
                    foo2: 'bar',
                },
            };
            const compareObject = {
                foo: {
                    foo2: 'bar2',
                },
            };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });
        it('should return true when objects keys are arrays and has diffrent lengths', () => {
            const srcObject = {
                foo: [
                    'bar',
                    'bar2',
                ],
            };
            const compareObject = {
                foo: [
                    'bar',
                ],
            };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });
        it('should return true when objects keys are arrays and has diffrent values', () => {
            const srcObject = {
                foo: [
                    'bar',
                    'bar2',
                ],
            };
            const compareObject = {
                foo: [
                    'bar',
                    'bar3',
                ],
            };
            expect(isNotEqualObject(srcObject, compareObject)).toBeTruthy();
        });


        it('should return true when objects keys has no diffrent values', () => {
            const srcObject = { foo: 'bar' };
            const compareObject = { foo: 'bar' };
            expect(isNotEqualObject(srcObject, compareObject)).toBeFalsy();
        });
        it('should return true when object properties are objects and has the same values', () => {
            const srcObject = {
                foo: {
                    foo2: 'bar',
                },
            };
            const compareObject = {
                foo: {
                    foo2: 'bar',
                },
            };
            expect(isNotEqualObject(srcObject, compareObject)).toBeFalsy();
        });
        it('should return true when objects properties are arrays and has the same lengths and values', () => {
            const srcObject = {
                foo: [
                    'bar',
                ],
            };
            const compareObject = {
                foo: [
                    'bar',
                ],
            };
            expect(isNotEqualObject(srcObject, compareObject)).toBeFalsy();
        });
    });
});
