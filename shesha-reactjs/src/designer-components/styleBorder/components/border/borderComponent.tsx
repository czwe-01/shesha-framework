import { Col, Input, InputNumber, Radio, Row, Select } from 'antd';
import React, { FC, useEffect } from 'react'
import { BorderBottomOutlined, BorderLeftOutlined, BorderOutlined, BorderRightOutlined, BorderTopOutlined, DashOutlined, ExpandOutlined, MinusOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined, RadiusUpleftOutlined, RadiusUprightOutlined, SmallDashOutlined } from '@ant-design/icons';
import { ColorPicker } from '@/components';
import { IBorderValue } from './interfaces';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';
import { IContainerComponentProps } from '@/interfaces';
import { on } from 'events';

const { Option } = Select;

const units = ['px', '%', 'em', 'rem', 'vh', 'svh', 'vw', 'svw', 'auto'];

interface IBorderProps {
    onChange?: (value) => void;
    value?: IBorderValue;
    readOnly?: boolean;
    model?: IContainerComponentProps;
}

const BorderComponent: FC<IBorderProps> = ({ onChange, readOnly, value = { activeBorder: 'all', activeRadius: 'all', border: { bottom: { unit: 'px' }, top: { unit: 'px' }, left: { unit: 'px' }, right: { unit: 'px' }, all: { unit: 'px' } } }, model }) => {

    useEffect(() => {
        onChange({ ...model, border: value });
    }, []);


    const updateValue = (newUnit: string) => {
        const updatedValue = {
            ...model, border: { ...model?.border, border: { ...model?.border?.border, [model?.border?.activeBorder]: { ...model?.border?.border?.[value.activeBorder], unit: newUnit } } }
        };
        onChange(updatedValue);
    };

    const renderRadioGroup = (
        options: { value: string; icon: React.ReactNode; title?: string }[],
        value: string,
        type: string,
        property?: string
    ) => (
        <SettingsFormItem name={property ? `border.border.${value}.${property}` : `border.${type}`} label={`${value}`} jsSetting>
            <Radio.Group defaultValue='all'>
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

    const addOnAfter = (
        <Select
            value={model?.border?.border?.[value.activeBorder]?.unit || 'px'}
            onChange={updateValue}
            onClick={(e) => e.stopPropagation()}
        >
            {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
        </Select>);

    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>
            <Col className="gutter-row" span={24}>
                <Col className="gutter-row" span={24}>
                    {renderRadioGroup(radiusOptions, value.activeRadius, 'activeRadius')}
                </Col>
                <Col className="gutter-row" span={24}>
                    <SettingsFormItem readOnly={readOnly} name={`border.radius.${value.activeRadius}`} jsSetting>
                        <InputNumber
                            min={0}
                            max={20}
                            value={model?.border?.radius?.[value.activeRadius]}
                        />
                    </SettingsFormItem>
                </Col>
                <Col className="gutter-row" span={24}>
                    {renderRadioGroup(borderOptions, value.activeBorder, 'activeBorder')}
                </Col>
                <Col className="gutter-row" span={24}>
                    <SettingsFormItem name={`border.border.${value.activeBorder}.width`} label="Width" jsSetting>
                        <Input
                            addonAfter={
                                addOnAfter
                            }
                            value={model?.border?.border?.[value.activeBorder]?.width}
                        />
                    </SettingsFormItem>
                </Col>
                <Col className="gutter-row" span={24}>
                    <SettingsFormItem name={`border.border.${value.activeBorder}.color`} label="Color" jsSetting>
                        <ColorPicker
                            allowClear
                            value={model?.border?.border?.[value.activeBorder]?.color || '#000000'}
                        />
                    </SettingsFormItem>
                </Col>
                <Col className="gutter-row" span={24}>
                    {renderRadioGroup(styleOptions, value.activeBorder, 'border', 'style')}
                </Col>
            </Col>
        </Row>
    )
};

export default BorderComponent;