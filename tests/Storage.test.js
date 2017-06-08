import Storage from '../src/components/Storage';

describe('Storage', () => {
    const storage = new Storage();
    const mockListener = jest.fn();
    it('should set value on model key', () => {
        storage.set('test','testValue');
        expect(storage.model.test).toBe('testValue');
    });
    it('should set new model', () => {
        storage.setModel({test2: 'testValue'});
        expect(storage.model.test2).toBe('testValue');
        expect(storage.model.test).toBeUndefined();
    });
    it('should register listener and call listener on set data', () => {
        storage.listen(mockListener);
        storage.setModel({test2: 'testValue2'});
        expect(mockListener).toBeCalled();
    });
    it('should not call listener on set data if flag runWithoutListeners is true', () => {
        storage.set('test2','testValue2', null, true);
        expect(mockListener).toHaveBeenCalledTimes(1);
    });

    it('should not call listener on setModel if flag runWithoutListeners is true', () => {
        storage.setModel({test2: 'testValue2'}, null, true);
        expect(mockListener).toHaveBeenCalledTimes(1);
    });

    it('should unregister', () => {
        storage.unlisten(mockListener);
        storage.setModel({test2: 'testValue2'});
        expect(mockListener).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if you try unregister listener that not exists', () => {
        storage.unlisten(mockListener);
        storage.setModel({test2: 'testValue2'});
        expect(mockListener).toHaveBeenCalledTimes(1);
    });
});