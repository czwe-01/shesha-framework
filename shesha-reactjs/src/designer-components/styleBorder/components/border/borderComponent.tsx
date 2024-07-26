import { Col, Input, InputNumber, Radio, RadioChangeEvent, Row, Select, Slider } from 'antd';
import React, { FC, useState } from 'react'
import { BorderBottomOutlined, BorderLeftOutlined, BorderOutlined, BorderRightOutlined, BorderTopOutlined, DashOutlined, ExpandOutlined, MinusOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined, RadiusUpleftOutlined, RadiusUprightOutlined, SmallDashOutlined } from '@ant-design/icons';
import { ColorPicker } from '@/components';
import { IBorderValue } from './interfaces';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';

const { Option } = Select;

const units = ['px', '%', 'em', 'rem', 'vh', 'svh', 'vw', 'svw', 'auto'];

interface IBorderProps {
    onChange?: (value: IBorderValue) => void;
    value?: IBorderValue;
    readOnly?: boolean;
}

const BorderComponent: FC<IBorderProps> = ({ onChange, readOnly, value = {
    radius: { all: 0 },
    border: {
        all: { width: 1, unit: 'px', color: '#000000', style: 'solid' }
    }
} }) => {
    const [localValue, setLocalValue] = useState<IBorderValue>(value);
    const [radiusType, setRadiusType] = useState<string>('all');
    const [borderType, setBorderType] = useState<string>('all');

    const updateValue = (newValue: Partial<IBorderValue>) => {
        const updatedValue = { ...localValue, ...newValue };
        setLocalValue(updatedValue);
        onChange?.(updatedValue);
    };

    const updateRadius = (key: string, value: number) => {
        if (value === 0) {
            const newRadius = { ...localValue.radius };
            delete newRadius[key];
            updateValue({ radius: newRadius });
        } else {
            updateValue({ radius: { ...localValue.radius, [key]: value } });
        }
    };

    const updateBorder = (key: string, value: any) => {
        if (value.width === 0) {
            const newBorder = { ...localValue.border };
            delete newBorder[key];
            updateValue({ border: newBorder });
        } else {
            updateValue({ border: { ...localValue.border, [key]: value } });
        }
    };

    const renderRadioGroup = (
        options: { value: string; icon: React.ReactNode; title?: string }[],
        value: string,
        onChange: (e: RadioChangeEvent) => void
    ) => (
        <SettingsFormItem name={`border.${value}`} label={`Border ${value}`} jsSetting>
            <Radio.Group onChange={onChange} value={value}>
                {options.map(option => (
                    <Radio.Button key={option.value} value={option.value} title={option.title}>
                        {option.icon}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </SettingsFormItem>
    );

    const radiusOptions = [
        { value: 'all', icon: <ExpandOutlined />, title: 'all' },
        { value: 'topLeft', icon: <RadiusUpleftOutlined />, title: 'top-left' },
        { value: 'topRight', icon: <RadiusUprightOutlined />, title: 'top-right' },
        { value: 'bottomLeft', icon: <RadiusBottomleftOutlined />, title: 'bottom-left' },
        { value: 'bottomRight', icon: <RadiusBottomrightOutlined />, title: 'bottom-right' },
    ];

    const borderOptions = [
        { value: 'all', icon: <BorderOutlined />, title: 'all' },
        { value: 'top', icon: <BorderTopOutlined />, title: 'top' },
        { value: 'right', icon: <BorderRightOutlined />, title: 'right' },
        { value: 'bottom', icon: <BorderBottomOutlined />, title: 'bottom' },
        { value: 'left', icon: <BorderLeftOutlined />, title: 'left' },
    ];

    const styleOptions = [
        { value: 'solid', icon: <MinusOutlined /> },
        { value: 'dashed', icon: <DashOutlined /> },
        { value: 'dotted', icon: <SmallDashOutlined /> },
    ];


    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>

            <Col className="gutter-row" span={24}>
                {renderRadioGroup(radiusOptions, radiusType, (e) => setRadiusType(e.target.value))}
            </Col>
            <Col className="gutter-row" span={24}>
                <Row>
                    <SettingsFormItem readOnly={readOnly} name={`border.radius.${radiusType}`} label="Radius">
                        <Col span={18}>
                            <Slider
                                min={0}
                                max={100}
                                value={localValue.radius[radiusType] || 0}
                                onChange={(value) => updateRadius(radiusType, value)}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={0}
                                max={100}
                                style={{ margin: '0 16px' }}
                                value={localValue.radius[radiusType] || 0}
                                onChange={(value) => updateRadius(radiusType, value)}
                            />
                        </Col>
                    </SettingsFormItem>
                </Row>
            </Col>
            <Col className="gutter-row" span={24}>
                {renderRadioGroup(borderOptions, borderType, (e) => setBorderType(e.target.value))}
            </Col>
            <Col className="gutter-row" span={24}>
                <SettingsFormItem name={`border.${borderType}.width`} label="Width" jsSetting>
                    <Input
                        addonAfter={
                            <Select
                                value={localValue.border[borderType]?.unit || 'px'}
                            >
                                {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
                            </Select>
                        }
                        value={localValue.border[borderType]?.width}
                    />
                </SettingsFormItem>
            </Col>
            <Col className="gutter-row" span={24}>
                <SettingsFormItem name={`border.${borderType}.color`} label="Color" jsSetting>
                    <ColorPicker
                        allowClear
                        value={localValue.border[borderType]?.color || '#000000'}
                        onChange={(color) => updateBorder(borderType, { ...localValue.border[borderType], color })}
                    />
                </SettingsFormItem>
            </Col>
            <Col className="gutter-row" span={24}>
                {renderRadioGroup(styleOptions, localValue.border[borderType]?.style || 'solid', (e) => updateBorder(borderType, { ...localValue.border[borderType], style: e.target.value }))}
            </Col>
        </Row>
    )
};

export default BorderComponent;