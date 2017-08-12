import React from 'react';
import FormEventsEmitter from '../src/components/FormEventsEmitter';

describe('FormEventsEmitter', () => {
    describe('listen', () => {
        const eventsEmitter = new FormEventsEmitter();
        const mockListener = jest.fn();
        const mockListener2 = jest.fn();
        const fakeListener = {};

        it('should not register listener if is not a function', () => {
            eventsEmitter.listen('testEvent', fakeListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(0);
        });

        it('should register listener', () => {
            eventsEmitter.listen('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
        });

        it('should not register the same listener two times', () => {
            eventsEmitter.listen('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
        });

        it('should register next listeners if is not the same', () => {
            eventsEmitter.listen('testEvent', mockListener2);
            expect(eventsEmitter.listeners.testEvent.length).toBe(2);
        });
    });
    describe('unlisten', () => {
        const eventsEmitter = new FormEventsEmitter();
        const mockListener = jest.fn();
        const mockListener2 = jest.fn();
        const fakeListener = {};
        eventsEmitter.listen('testEvent', mockListener);
        eventsEmitter.listen('testEvent2', fakeListener);
        
        it('should not unregistered listener if event not exist', () => {
            eventsEmitter.unlisten('testEvent3', mockListener);
            expect(eventsEmitter.listeners.testEvent3).toBe(undefined);
        });

        it('should not unregistered listener if event dont have registred listeners', () => {
            eventsEmitter.unlisten('testEvent2', mockListener);
            expect(eventsEmitter.listeners.testEvent2.length).toBe(0);
        });

        it('should not unregistered listener if not exists', () => {
            eventsEmitter.unlisten('testEvent', mockListener2);
            expect(eventsEmitter.listeners.testEvent.length).toBe(1);
        });

        it('should unregistered listener', () => {
            eventsEmitter.unlisten('testEvent', mockListener);
            expect(eventsEmitter.listeners.testEvent.length).toBe(0);
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
            const listener = () => { return 'test' };
            eventsEmitter.listen('testEvent', listener);
            const response = eventsEmitter.emit('testEvent');
            expect(response).toEqual(['test']);
        });
    });
});
