import React from 'react';

/**
 * @param {string} label -- selector's label name
 * @param {string} id -- selector's wrapper id
 * @param {object} selectorOptions -- object like { optionValue : optionText }
 **/ 
export function selectorGenerator(label, id, selectorOptions = {}) {
    const options = Object.keys(selectorOptions).map((value) => {
        return <option key = { value } value = { value } >{ selectorOptions[value] }</option>
    });

    return function (props) {
        const onChangeListener = props.onChange;
        return (
            <div>
                <label>{ label + ': ' }</label>
                <select id = { id } onChange = { onChangeListener } >{ options }</select>
            </div>
        );
    }
}

/**
 * @param {string} label -- selector's label name
 * @param {string} id -- selector's wrapper id
 **/
export function colorPickerGenerator(label, id) {
    return function (props) {
        const onChangeListener = props.onChange;
        return (
            <div>
                <label>{ label + ': ' }</label>
                <input id = { id } type = "color" onChange = { onChangeListener }/>
            </div>
        );
    }
}