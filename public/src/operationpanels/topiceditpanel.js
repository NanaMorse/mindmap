import React, { Component } from 'react';

import { selectionsManager } from '../managers';

import { selectorGenerator, colorPickerGenerator } from './widgetgenerator';

const widgetIdToOperatorMap = {
    'updateFontSize' : 'onUpdateFontSize',
    'updateFillColor' : 'onUpdateFillColor'
};

const UpdateFontSizeSelector = selectorGenerator('font size', 'updateFontSize', {
    '10px' : '10',
    '20px' : '20',
    '30px' : '30'
});

const UpdateFillColorPicker = colorPickerGenerator('fill color', 'updateFillColor');

class TopicEditPanel extends Component {
    render () {
        
        const panelProps = {
            className : 'topic-edit-panel'
        };
        
        const widgetChangeListener = this.onWidgetValueChange.bind(this);

        return (
            <div { ...panelProps } >
                <UpdateFontSizeSelector onChange = { widgetChangeListener } />
                <UpdateFillColorPicker onChange = { widgetChangeListener } />
            </div>
        );
    }
    
    onWidgetValueChange (e) {
        const widgetId = e.target.id;
        const widgetValue = e.target.value;

        selectionsManager.getSelectionsArray().forEach((component) => {
            component[widgetIdToOperatorMap[widgetId]](widgetValue);
        });
    }
}

export default TopicEditPanel;