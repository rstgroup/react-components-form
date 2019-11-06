import { FormDebugger, FEATURES } from '../../src/components/FormDebugger';

describe('FormDebugger', () => {
    let formDebugger;
    beforeEach(() => {
        formDebugger = new FormDebugger();
    });

    it('should set custom settings', () => {
        const formDebuggerWithCustomSettings = new FormDebugger({
            [FEATURES.FORM_STATE_HISTORY]: false,
            [FEATURES.FIELD_RERENDER]: false,
        });
        expect(formDebuggerWithCustomSettings.settings).toEqual({
            [FEATURES.FORM_STATE_HISTORY]: false,
            [FEATURES.FIELD_RERENDER]: false,
            [FEATURES.FIELD_LISTENER]: true,
        })
    });

    it('should register form instance', () => {
        const formMockInstance = {
            getPath: () => 'form',
            storage: {
                listen: jest.fn(),
            }
        };
        formDebugger.registerFormInstance(formMockInstance);
        expect(formDebugger.forms).toEqual({
            form: formMockInstance,
        });
    });

    it('should register form state history when register form state history feature is enabled', () => {
        const formId = 'form';
        const formState = {
            fieldOne: 'test1',
            fieldTwo: 'test1',
        };
        const formMockInstance = {
            getPath: () => formId,
            storage: {
                getModel: () => formState
            },
        };

        formDebugger.registerStateHistory(formMockInstance);
        formState.fieldTwo = 'test2';
        formDebugger.registerStateHistory(formMockInstance);

        expect(formDebugger.formStateHistory[formId][0].state).toEqual({
            fieldOne: 'test1',
            fieldTwo: 'test1',
        });
        expect(formDebugger.formStateHistory[formId][0]).toHaveProperty('time');

        expect(formDebugger.formStateHistory[formId][1].state).toEqual({
            fieldOne: 'test1',
            fieldTwo: 'test2',
        });
        expect(formDebugger.formStateHistory[formId][1]).toHaveProperty('time');
    });

    it('should not register form state history when register form state history feature is disabled', () => {
        const formId = 'form';
        const formState = {
            fieldOne: 'test1',
            fieldTwo: 'test1',
        };
        const formMockInstance = {
            getPath: () => formId,
            storage: {
                getModel: () => formState
            },
        };
        formDebugger.settings[FEATURES.FORM_STATE_HISTORY] = false;
        formDebugger.registerStateHistory(formMockInstance);

        expect(formDebugger.formStateHistory[formId]).toEqual(undefined);
    });

    it('should set form state when form instance is registered', () => {
        const formMockInstance = {
            getPath: () => 'form',
            storage: {
                setModel: jest.fn(),
                listen: jest.fn(),
            }
        };
        const mockedState = { test: 'test' };
        formDebugger.registerFormInstance(formMockInstance);
        formDebugger.setFormState(formMockInstance.getPath(), mockedState);
        expect(formMockInstance.storage.setModel).toHaveBeenCalledWith(mockedState);
    });

    it('should not set form state when form instance is not registered', () => {
        const formMockInstance = {
            getPath: () => 'form',
            storage: {
                setModel: jest.fn(),
            }
        };
        const mockedState = { test: 'test' };
        formDebugger.setFormState(formMockInstance.getPath(), mockedState);
        expect(formMockInstance.storage.setModel).not.toHaveBeenCalledWith(mockedState);
    });

    it('should register field listener when register field listeners feature is enabled', () => {
        const fieldMockInstance = { getPath: () => 'form.t1' };
        formDebugger.registerFieldListener(fieldMockInstance);
        formDebugger.registerFieldListener(fieldMockInstance);
        expect(formDebugger.fieldListeners[fieldMockInstance.getPath()]).toEqual(2);
    });

    it('should not register field listener when register field listeners feature is disabled', () => {
        const fieldMockInstance = { getPath: () => 'form.t1' };
        formDebugger.settings[FEATURES.FIELD_LISTENER] = false;
        formDebugger.registerFieldListener(fieldMockInstance);
        expect(formDebugger.fieldListeners[fieldMockInstance.getPath()]).toEqual(undefined);
    });

    it('should register field rerender when register field rerender feature is enabled', () => {
        const fieldMockInstance = { getPath: () => 'form.t1' };
        formDebugger.registerFieldRerender(fieldMockInstance);
        formDebugger.registerFieldRerender(fieldMockInstance);
        expect(formDebugger.fieldRerenders[fieldMockInstance.getPath()]).toEqual(2);
    });

    it('should not register rerender listener when register field rerender feature is disabled', () => {
        const fieldMockInstance = { getPath: () => 'form.t1' };
        formDebugger.settings[FEATURES.FIELD_RERENDER] = false;
        formDebugger.registerFieldRerender(fieldMockInstance);
        expect(formDebugger.fieldRerenders[fieldMockInstance.getPath()]).toEqual(undefined);
    });

    it('should register event emitter', () => {
        const eventEmitter = { emit: jest.fn() };
        formDebugger.registerEventEmitter(eventEmitter);
        expect(formDebugger.hasRegisteredEventEmitter()).toEqual(true);
    });

    it('should emit event when events emitter is registered', () => {
        const eventEmitter = { emit: jest.fn() };
        const eventName = 'testEvent';
        const eventData = { test: 'test' };
        formDebugger.registerEventEmitter(eventEmitter);
        formDebugger.emitEvent(eventName, eventData);
        expect(eventEmitter.emit).toHaveBeenCalledWith(eventName, eventData);
    });

    it('should not emit event when events emitter is not registered', () => {
        const eventEmitter = { emit: jest.fn() };
        const eventName = 'testEvent';
        const eventData = { test: 'test' };
        formDebugger.emitEvent(eventName, eventData);
        expect(eventEmitter.emit).not.toHaveBeenCalledWith(eventName, eventData);
    });

    it('should register emitted event', () => {
        const eventName = 'testEvent';
        const eventData = { test: 'test' };
        formDebugger.registerEmittedEvent(eventName, eventData);
        expect(formDebugger.emittedEvents).toEqual([{ eventName, data: eventData }]);
    });
});
