import { Col, Input, Radio, Row, Select } from 'antd';
import React, { FC, useState } from 'react';
import { BorderlessTableOutlined, ColumnWidthOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';

const { Option } = Select;

const units = ['px', '%', 'em', 'rem', 'vh', 'svh', 'vw', 'svw', 'auto'];

export interface ISizeValueWithUnit {
    value: number | string;
    unit: string;
}

export interface ISizeValue {
    width?: ISizeValueWithUnit;
    height?: ISizeValueWithUnit;
    minWidth?: ISizeValueWithUnit;
    minHeight?: ISizeValueWithUnit;
    maxWidth?: ISizeValueWithUnit;
    maxHeight?: ISizeValueWithUnit;
    overflow?: string;
}

export interface ISizeType {
    onChange?: (value: ISizeValue) => void;
    value?: ISizeValue;
    readOnly?: boolean;
}

const SizeComponent: FC<ISizeType> = ({ onChange, readOnly, value = { width: null, height: null, minWidth: null, minHeight: null, maxHeight: null, maxWidth: null } }) => {

    const [localValue, setLocalValue] = useState<ISizeValue>(value);

    const updateValue = (key: keyof ISizeValue, newValue: ISizeValueWithUnit | string) => {
        const updatedValue = { ...localValue, [key]: newValue };
        setLocalValue(updatedValue);
        onChange?.(updatedValue);
    };

    const renderSizeInputWithUnits = (label: string, property: keyof ISizeValue) => {
        const currentValue = localValue[property] && localValue[property] as ISizeValueWithUnit || { value: '', unit: 'px' };

        const selectAfter = (
            <Select
                value={currentValue.unit}
                onChange={(unit) => updateValue(property, { ...currentValue, unit })}
            >
                {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
            </Select>
        );

        return (
            <Col className="gutter-row" span={12}>
                <SettingsFormItem name={`dimensions.${property}`} label={label} jsSetting>
                    <Input
                        addonAfter={selectAfter}
                        value={currentValue.value}
                        readOnly={readOnly}
                    />
                </SettingsFormItem>
            </Col>
        );
    };

    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>
            {renderSizeInputWithUnits('Width', 'width')}
            {renderSizeInputWithUnits('Height', 'height')}
            {renderSizeInputWithUnits('Min W', 'minWidth')}
            {renderSizeInputWithUnits('Min H', 'minHeight')}
            {renderSizeInputWithUnits('Max W', 'maxWidth')}
            {renderSizeInputWithUnits('Max H', 'maxHeight')}
            <Col className="gutter-row" span={24}>
                <SettingsFormItem readOnly={readOnly} name="overflow" label="Overflow" jsSetting>
                    <Radio.Group value={localValue.overflow} >
                        <Radio.Button value="visible" title="Visible"><EyeOutlined /></Radio.Button>
                        <Radio.Button value="hidden" title="Hidden"><EyeInvisibleOutlined size={32} /></Radio.Button>
                        <Radio.Button value="scroll" title="Scroll"><ColumnWidthOutlined /></Radio.Button>
                        <Radio.Button value="auto" title="Auto"><BorderlessTableOutlined /></Radio.Button>
                    </Radio.Group>
                </SettingsFormItem>
            </Col>
        </Row>
    );
};

export default SizeComponent;