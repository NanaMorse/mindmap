import * as React from 'react';
import FormEvent = __React.FormEvent;
import MouseEvent = __React.MouseEvent;
import FocusEvent = __React.FocusEvent;
import KeyboardEvent = __React.KeyboardEvent;

interface selectorProps {
  value: string;
  onChange: (event: FormEvent) => void;
}

interface selectorOptionsObject {
  [optionValue: string]: string
}

interface buttonProps {
  disabled?: boolean;
  onClick: (event: MouseEvent) => void;
}

interface textInputProps {
  value: string;
  onChange: (event: FormEvent) => void;
  onBlur: (event: FocusEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void
}

interface checkBoxProps {
  checked: boolean;
  onClick: (event: MouseEvent) => void
}

interface colorPickerProps {
  value: string;
  onChange: (event: FormEvent) => void
}

export function selectorGenerator(label: string, id: string, selectorOptions: selectorOptionsObject) {
  const options = Object.keys(selectorOptions).map((value) => {
    return <option key={ value } value={ value }>{ selectorOptions[value] }</option>
  });

  return function (props: selectorProps) {
    return (
      <div>
        <label>{ label + ': ' }</label>
        <select id={ id } {...props}>{ options }</select>
      </div>
    );
  }
}

export function buttonGenerator(innerText: string, id: string) {
  return function (props: buttonProps) {
    return (
      <button className="primary-button small-button" id={ id } {...props}>{ innerText }</button>
    )
  }
}

export function textInputGenerator(label: string, id: string) {
  return function (props: textInputProps) {
    return (
      <div>
        <label>{label + ': '}</label>
        <input {...props} id={id}/>
      </div>
    );
  }
}

export function checkBoxGenerator(label: string, id: string) {
  return function (props: checkBoxProps) {
    return (
      <div>
        <input type="checkbox" id={id} {...props}/>
        <label>{label}</label>
      </div>
    )
  }
}

export function colorPickerGenerator(label: string, id: string) {
  return function (props: colorPickerProps) {
    return (
      <div>
        <label>{ label + ': ' }</label>
        <input id={ id } type="color" {...props}/>
      </div>
    );
  }
}