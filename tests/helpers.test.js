import { get } from '../src/helpers';

describe('helpers', () => {
    describe('get', () => {
        const valueABC = 'testABC';
        const valueBC = 'testBC';
        const test = {
            a: {
                b: {
                    c: valueABC
                }
            },
            b: {
                c: valueBC
            }
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
});