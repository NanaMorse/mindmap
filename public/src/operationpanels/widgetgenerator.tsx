import * as React from 'react';
import { SwatchesPicker } from 'react-color';

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
  onChange: (id: string, colorHex: string) => void
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

interface colorPickerWrapperProps extends colorPickerProps {
  id: string
}

interface choiceColor {
  hex: string
}

class ColorPicker extends React.Component<colorPickerWrapperProps, any> {

  constructor() {
    super();
    this.state = {
      displayColorPicker: false,
      color: ''
    }
  }

  onClickSwatch() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  onClosePicker() {
    this.setState({ displayColorPicker: false });
  }

  onColorChange(color: choiceColor) {
    this.setState({color: color.hex})
  }

  onColorChangeComplete(color: choiceColor) {
    this.props.onChange(this.props.id, color.hex);
  }

  render() {

    const swatchProps = {
      className: 'color-picker-swatch',
      onClick: () => this.onClickSwatch()
    };

    let showColor;
    if (this.state.displayColorPicker) {
      showColor = this.state.color;
    } else {
      showColor = this.props.value;
      this.state.color = this.props.value;
    }

    const styleColor = {
      background: showColor
    };

    const coverProps = {
      className: 'color-picker-cover',
      onClick: () => this.onClosePicker()
    };

    const pickerProps = {
      color: showColor,
      onChange: (color) => this.onColorChange(color),
      onChangeComplete: (color) => this.onColorChangeComplete(color)
    };

    return (
      <div className="sketch-color-picker">
        <div {...swatchProps}>
          <div style={styleColor} ></div>
        </div>
        { this.state.displayColorPicker ? 
          <div className="color-picker-popover">
            <div {...coverProps}></div>
            <SwatchesPicker {...pickerProps} />
          </div> : null 
        }
      </div>
    )
  }
}

export function colorPickerGenerator(label: string, id: string) {
  return function (props: colorPickerProps) {
    return (
      <div>
        <label>{ label + ': ' }</label>
        <ColorPicker id={id} {...props} />
      </div>
    );
  }
}