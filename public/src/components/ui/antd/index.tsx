import * as React from 'react'
import { SwatchesPicker } from 'react-color'

import 'antd/lib/button/style/css'
export const Button = require('antd/lib/button');

import 'antd/lib/Dropdown/style/css'
export const Dropdown = require('antd/lib/Dropdown');

import 'antd/lib/Menu/style/css'
export const Menu = require('antd/lib/Menu');

import 'antd/lib/Icon/style/css'
export const Icon = require('antd/lib/Icon');

import 'antd/lib/Select/style/css'
export const Select = require('antd/lib/Select');

import 'antd/lib/Switch/style/css'
export const Switch = require('antd/lib/Switch');


interface SelectorProps {
  // the option list for selector
  options: { [index: string]: string }
  value: string
  style?: any
  onChange: (value: string) => any
}

// dropdown with button
export class Selector extends React.Component<SelectorProps, any> {

  renderOptionList() {
    const Option = Select.Option;
    return Object.keys(this.props.options).map(optionValue => {
      return <Option value={optionValue} key={optionValue}>{this.props.options[optionValue]}</Option>
    })
  }

  render() {
    return (
      <Select value={this.props.value} onChange={this.props.onChange.bind(this)} style={this.props.style}>
        { this.renderOptionList() }
      </Select>
    )
  }
}

interface colorPickerProps {
  value: string
  onChange: (colorHexValue: string) => any
}

export class ColorPicker extends React.Component<colorPickerProps, any> {

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

  onColorChange(color) {
    this.setState({color: color.hex})
  }

  onColorChangeComplete(color) {
    this.props.onChange(color.hex);
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