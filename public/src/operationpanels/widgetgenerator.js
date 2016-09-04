import React from 'react';

/**
 * @param {string} label -- selector's label name
 * @param {string} id -- selector's wrapper id
 * @param {object} selectorOptions -- object like { optionValue : optionText }
 **/
export function selectorGenerator(label, id, selectorOptions = {}) {
  const options = Object.keys(selectorOptions).map((value) => {
    return <option key={ value } value={ value }>{ selectorOptions[value] }</option>
  });

  return function (props) {
    return (
      <div>
        <label>{ label + ': ' }</label>
        <select id={ id } {...props}>{ options }</select>
      </div>
    );
  }
}

export function buttonGenerator(innerText, id) {
  return function (props) {
    return (
      <button className="primary-button small-button" id={ id } {...props}>{ innerText }</button>
    )
  }
}

export function textInputGenerator(label, id) {
  return function (props) {
    return (
      <div>
        <label>{label + ': '}</label>
        <input {...props} id={id}/>
      </div>
    );
  }
}

export function checkBoxGenerator(label, id) {
  return function (props) {
    return (
      <div>
        <input type="checkbox" id={id} {...props}/>
        <label>{label}</label>
      </div>
    )
  }
}

/**
 * @param {string} label -- selector's label name
 * @param {string} id -- selector's wrapper id
 **/
export function colorPickerGenerator(label, id) {
  return function (props) {
    return (
      <div>
        <label>{ label + ': ' }</label>
        <input id={ id } type="color" {...props}/>
      </div>
    );
  }
}