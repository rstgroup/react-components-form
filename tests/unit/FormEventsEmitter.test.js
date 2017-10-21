import FormEventsEmitter from '../../src/components/FormEventsEmitter';

describe('FormEventsEmitter', () => {
    describe('listen', () => {
        const eventsEmitter = new FormEventsEmitter();
        const mockListener = jest.fn();
        const mockListener2 = jest.fn();
        const fakeListener = {};

        it('should not register listener if is not a function', () => {
            console.warn = jest.fn();
            eventsEmitter.listen('testEvent', fakeListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(0);
            expect(console.warn).toBeCalledWith('FormEventsEmitter->listen - "testEvent" listener is not a function');
        });

        it('should register listener', () => {
            console.warn = jest.fn();
            eventsEmitter.listen('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
            expect(console.warn).not.toBeCalled();
        });

        it('should not register the same listener two times', () => {
            console.warn = jest.fn();
            eventsEmitter.listen('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
            expect(console.warn).toBeCalledWith('FormEventsEmitter->listen - "testEvent" events listener is allready registered');
        });

        it('should register next listeners if is not the same', () => {
            console.warn = jest.fn();
            eventsEmitter.listen('testEvent', mockListener2);
            expect(eventsEmitter.listeners.testEvent.length).toBe(2);
            expect(console.warn).not.toBeCalled();
        });
    });
    describe('unlisten', () => {
        const eventsEmitter = new FormEventsEmitter();
        const mockListener = jest.fn();
        const mockListener2 = jest.fn();
        eventsEmitter.listen('testEvent', mockListener);

        it('should not unregistered listener if event not exist', () => {
            console.warn = jest.fn();
            eventsEmitter.unlisten('testEvent3', mockListener);
            expect(eventsEmitter.listeners.testEvent3).toBeUndefined();
            expect(console.warn).toBeCalledWith('FormEventsEmitter->unlisten - "testEvent3" event not registered');
        });

        it('should not unregistered listener if event dont have registred listeners', () => {
            console.warn = jest.fn();
            eventsEmitter.listen('testEvent2', {});
            eventsEmitter.unlisten('testEvent2', mockListener);
            expect(eventsEmitter.listeners.testEvent2.length).toBe(0);
            expect(console.warn).toBeCalledWith('FormEventsEmitter->unlisten - "testEvent2" event dont have registered listener');
        });

        it('should not unregistered listener if not exists', () => {
            console.warn = jest.fn();
            eventsEmitter.unlisten('testEvent', mockListener2);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
            expect(console.warn).toBeCalledWith('FormEventsEmitter->unlisten - "testEvent" listener not exists');
        });

        it('should unregistered listener', () => {
            console.warn = jest.fn();
            eventsEmitter.unlisten('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(0);
            expect(console.warn).not.toBeCalled();
        });
    });

    describe('emit', () => {
        const eventsEmitter = new FormEventsEmitter();
        const mockListener = jest.fn();
        eventsEmitter.listen('testEvent', mockListener);

        it('should call all events listeners with data', () => {
            const data = { foo: 'bar', bar: 'foo' };
            eventsEmitter.emit('testEvent', data);
            expect(mockListener).toBeCalledWith(data);
        });

        it('should return response from listeners', () => {
            const listener = () => 'test';
            eventsEmitter.listen('testEvent', listener);
            const response = eventsEmitter.emit('testEvent');
            expect(response).toEqual(['test']);
        });
    });
});
