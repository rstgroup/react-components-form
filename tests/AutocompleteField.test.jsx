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

const MockItem = () => (
    <div>test item</div>
);

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

    it('should display all options if alwaysRenderSuggestions flag is active', () => {
        props.options = [
            {name: 'test', value: 1},
            {name: 'test2', value: 2},
            {name: 'test3', value: 3}
        ];
        props.searchKey = 'name';
        props.renderItem = () => <MockItem />;
        props.alwaysRenderSuggestions = true;
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: '' } });
        expect(wrapper.find(MockItem).length).toBe(3);
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

    it('onSuggestionsClearRequested clears suggestions list', () => {
        props.options = [
            {name: 'test', value: 1},
            {name: 'test2', value: 2},
            {name: 'test3', value: 3}
        ];
        props.searchKey = 'name';
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        expect(wrapper.state().suggestions.length).toBe(3);
        wrapper.instance().onSuggestionsClearRequested();
        expect(wrapper.state().suggestions.length).toBe(0);

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
        expect(wrapper.instance().applySectionFilter(places, 'poland', 'name')).toEqual([]);
    });

    it('onKeyDown when enter pressed', () => {
        const preventDefaultSpy = jest.fn();
        const stopPropagationSpy = jest.fn();
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.instance().onKeyDown({
            keyCode: 13,
            preventDefault: preventDefaultSpy,
            stopPropagation: stopPropagationSpy,
        });
        expect(preventDefaultSpy).toBeCalled();
        expect(stopPropagationSpy).toBeCalled();
    });

    it('onKeyDown when different key than enter pressed', () => {
        const preventDefaultSpy = jest.fn();
        const stopPropagationSpy = jest.fn();
        const wrapper = mount(<AutocompleteField {...props} />);
        wrapper.instance().onKeyDown({
            keyCode: 12,
            preventDefault: preventDefaultSpy,
            stopPropagation: stopPropagationSpy,
        });
        expect(preventDefaultSpy).not.toBeCalled();
        expect(stopPropagationSpy).not.toBeCalled();
    });

    it('getSuggestions returns empty array when filter is empty and proper flag state passed', () => {
        props.options = [
            {name: 'test', value: 1},
            {name: 'test2', value: 2},
            {name: 'test3', value: 3}
        ];
        props.searchKey = 'name';
        props.suggestionsShownIfFieldEmpty = false;
        const wrapper = mount(<AutocompleteField {...props} />);
        const suggestions = wrapper.instance().getSuggestions('');
        expect(suggestions).toEqual([]);
    });

    it('getSuggestions returns whole options array when filter is empty and proper flag state passed', () => {
        const options = [
            {name: 'test', value: 1},
            {name: 'test2', value: 2},
            {name: 'test3', value: 3}
        ];
        props.options = options;
        props.searchKey = 'name';
        props.suggestionsShownIfFieldEmpty = true;
        const wrapper = mount(<AutocompleteField {...props} />);
        const suggestions = wrapper.instance().getSuggestions('');
        expect(suggestions).toEqual(options);
    });

    it('getSuggestions returns whole options array', () => {
        const options = [
            {
                title: 'test',
                suggestions: [
                    {name: 'test', value: 1},
                    {name: 'test2', value: 2},
                    {name: 'test3', value: 3}
                ]
            },
        ];
        props.options = options;
        props.searchKey = 'name';
        props.multiSection = true;
        props.suggestionsShownIfFieldEmpty = true;
        const wrapper = mount(<AutocompleteField {...props} />);
        const suggestions = wrapper.instance().getSuggestions('test');
        expect(suggestions).toEqual(options);
    });
});