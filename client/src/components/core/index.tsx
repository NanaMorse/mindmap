import * as React from 'react'
import Sheet from './Sheet'
import Map from './Map'
import { LocalStorageKey } from 'src/constants/common'
import { Slider } from 'src/components/ui/antd'
import './index.scss'

interface CoreComponentState {
  /**
   * @description svg的缩放值
   * */
  scaleValue: number
}

class CoreComponent extends React.PureComponent<any, CoreComponentState> {

  constructor() {
    super();

    this.state = {
      // 缩放值默认为1
      scaleValue: Number(localStorage.getItem(LocalStorageKey.SCALE_VALUE)) || 1
    }
  }

  /**
   * @description 监听缩放值改变
   * */
  onScaleValueChanged(value: number) {
    this.setState({ scaleValue: value });
    localStorage.setItem(LocalStorageKey.SCALE_VALUE, value.toString());
  }

  /**
   * @description 输出改变svg缩放的slider
   * */
  renderScaleChangeSlider() {
    const sliderProps = {
      min: 0.5,
      max: 1.5,
      step: 0.1,
      dots: true,
      vertical: true,
      value: this.state.scaleValue,
      onChange: (value) => this.onScaleValueChanged(value)
    };

    return (
      <div className="scale-slider-container">
        <Slider { ...sliderProps }/>
      </div>
    )
  }

  render() {

    return (
      <div className="core-container">
        <Sheet>
          <Map scaleValue={this.state.scaleValue}/>
        </Sheet>
      </div>
    )
  }
}

export default CoreComponent