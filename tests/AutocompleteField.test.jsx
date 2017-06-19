import React from 'react';
import { mount } from 'enzyme';
import {AutocompleteField} from '../src/components/AutocompleteField';

const promiseMock = (data) => {
    return () => ({
        then(method){
            return method(data);
        }
    });
};

describe('AutocompleteField', () => {
    let onChangeData,
        testError,
        errorStyles,
        props;

    beforeEach(() => {
        onChangeData = jest.fn();
        testError = ['testError'];
        errorStyles = {
            className: 'errorClassName'
        };
        props = {
            name: 'firstName',
            label: 'first name',
            onChange: onChangeData,
            error: true,
            errors: testError,
            errorsStyles: errorStyles,
            className: 'testComponent',
            options: ['test', 'test2', 'test3']
        };
    });

    it('should call onChange method on change event', () => {
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        expect(onChangeData).toBeCalled();
    });

    it('should filter sugestions and clear it if empty input', () => {
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'test2' } });
        expect(wrapper.state().suggestions.length).toBe(1);
        wrapper.find('input').simulate('change', { target: { value: '' } });
        expect(wrapper.state().suggestions.length).toBe(0);
    });

    it('should use getOptions to getSuggesions', () => {
        props.getOptions = promiseMock(['testA1', 'testA2', 'testA3']);
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        expect(wrapper.state().suggestions.length).toBe(3);
        expect(wrapper.state().suggestions[0]).toBe('testA1');
    });

    it('should search options by key', () => {
        props.options = [
            {name: 'test', value: 1},
            {name: 'test2', value: 2},
            {name: 'test3', value: 3}
        ];
        props.searchKey = 'name';
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        expect(wrapper.state().suggestions.length).toBe(3);
    });

    it('static getSuggestion', () => {
        expect(AutocompleteField.getSuggestion('test')).toBe('test');
    });

    it('static renderSuggestion', () => {
        expect(AutocompleteField.renderSuggestion('test').props.children).toBe('test');
    });

    it('static renderSectionTitle', () => {
        expect(AutocompleteField.renderSectionTitle({ title: 'test' }).props.children).toBe('test');
    });

    it('static getSectionSuggestions', () => {
        const suggestions = [
            {
                name: 'name1'
            },
            {
                name: 'name2'
            }
        ];
        expect(AutocompleteField.getSectionSuggestions({ suggestions: suggestions })).toEqual(suggestions);
    });

    it('applySectionFilter filters suggestions list properly', () => {
        const places = [
            {
                title: 'Favourite',
                suggestions: [
                    {
                        name: 'Office'
                    },
                    {
                        name: 'Restaurant'
                    }
                ]
            },
            {
                title: 'Other',
                suggestions: [
                    {
                        name: 'Bar'
                    },
                    {
                        name: 'Online'
                    }
                ]
            }
        ];
        const filteredPlaces = [
            {
                title: 'Favourite',
                suggestions: [
                    {
                        name: 'Office'
                    }
                ]
            },
            {
                title: 'Other',
                suggestions: [
                    {
                        name: 'Online'
                    }
                ]
            }
        ];
        const wrapper = mount(<AutocompleteField {...props} />);
        expect(wrapper.instance().applySectionFilter(places, 'o', 'name')).toEqual(filteredPlaces);
    });
});