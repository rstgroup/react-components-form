import React from 'react';
import FormEventsListener from '../src/components/FormEventsListener';

describe('FormEventsListener', () => {
    const eventsListener = new FormEventsListener();
    const mockMethod = jest.fn();
    const mockMethod2 = jest.fn();
    it('should register event', () => {
        eventsListener.registerEvent('afterSubmit');
        expect(Array.isArray(eventsListener.eventsListeners.afterSubmit)).toBe(true);
    });

    it('should unregister event', () => {
        eventsListener.unregisterEvent('afterSubmit');
        expect(!!eventsListener.eventsListeners.afterSubmit).toBe(false);
    });

    it('should not unregister event if not exists', () => {
        eventsListener.unregisterEvent('afterSubmit');
        expect(Object.keys(eventsListener.eventsListeners).length).toBe(4);
    });

    it('should register event listener', () => {
        eventsListener.registerEventListener('submit', mockMethod);
        eventsListener.registerEventListener('submit', mockMethod2);
        expect(eventsListener.eventsListeners.submit.length).toBe(2);
        expect(eventsListener.eventsListeners.submit[0]).toBe(mockMethod);
    });

    it('should not register event listener if event not registred', () => {
        eventsListener.registerEventListener('submit2', mockMethod);
        expect(!!eventsListener.eventsListeners.submit2).toBe(false);
    });

    it('should call event', () => {
        eventsListener.callEvent('submit', {test: 'test'});
        expect(mockMethod.mock.calls.length).toBe(1);
        expect(mockMethod2.mock.calls.length).toBe(1);
    });

    it('should unregister event listener', () => {
        eventsListener.unregisterEventListener('submit', mockMethod);
        expect(eventsListener.eventsListeners.submit.length).toBe(1);
    });

    it('should not unregister event listener if not exists', () => {
        eventsListener.unregisterEventListener('submit', mockMethod);
        eventsListener.unregisterEventListener('submit2', mockMethod);
        expect(eventsListener.eventsListeners.submit.length).toBe(1);
    });

    it('should not call event if not exists', () => {
        eventsListener.callEvent('submit2');
        expect(mockMethod2.mock.calls.length).toBe(1);
    });
});
