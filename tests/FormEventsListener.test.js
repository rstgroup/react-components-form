import React from 'react';
import FormEventsListener from '../src/components/FormEventsListener';

describe('FormEventsListener', () => {
    const eventsListener = new FormEventsListener();
    const mockMethod = jest.fn();
    it('should register event', () => {
        eventsListener.registerEvent('submit', mockMethod);
        expect(Object.keys(eventsListener).length).toBe(1);
        expect(typeof eventsListener.events.submit).toBe('function');
    });

    it('should call event', () => {
        eventsListener.callEvent('submit', {test: 'test'});
        expect(mockMethod.mock.calls.length).toBe(1);
    });

    it('should unregister event', () => {
        eventsListener.unregisterEvent('submit');
        expect(!eventsListener.events.submit).toBe(true);
    });

    it('should not unregister event if not exists', () => {
        eventsListener.unregisterEvent('submit');
        expect(!eventsListener.events.submit).toBe(true);
    });

    it('should not call event if not exists', () => {
        eventsListener.callEvent('submit');
        expect(mockMethod.mock.calls.length).toBe(1);
    });
});