import React, { FC, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row, Select, Space } from 'antd';
import { useStyles } from './styles';

type SizeAndRepeatProps = {
    updateValue: (value: any) => void;
    backgroundSize: any;
    backgroundPosition: any;
    backgroundRepeat: string;
    readOnly?: boolean;
};

const units = ['px', '%', 'em', 'rem', 'vh', 'svh', 'vw', 'svw', 'auto'];
const { Option } = Select;

const SizeAndRepeat: FC<SizeAndRepeatProps> = ({ updateValue, backgroundSize, backgroundPosition, backgroundRepeat, readOnly }) => {
    const { styles } = useStyles();

    const defaultSizes = ['cover', 'contain', 'auto'];
    const [sizes, setSizes] = useState<string[]>(() => {
        const initialSizes = [...defaultSizes];
        if (backgroundSize && !defaultSizes.includes(backgroundSize)) {
            initialSizes.push(backgroundSize);
        }
        return initialSizes;
    });

    const defaultPositions = ['center', 'top', 'left', 'right', 'bottom', 'top left', 'top right', 'bottom left', 'bottom right'];
    const [positions, setPositions] = useState<string[]>(() => {
        const initialPositions = [...defaultPositions];
        if (backgroundPosition && !defaultPositions.includes(backgroundPosition)) {
            initialPositions.push(backgroundSize);
        }
        return initialPositions;
    });


    const [size, setSize] = useState<{ width: { value: string, unit: string }, height: { value: string, unit: string } }>({ width: { value: '', unit: 'px' }, height: { value: '', unit: 'px' } });
    const [position, setPosition] = useState<{ width: { value: string, unit: string }, height: { value: string, unit: string } }>({ width: { value: '', unit: 'px' }, height: { value: '', unit: 'px' } });

    useEffect(() => {
        if (backgroundSize && !defaultSizes.includes(backgroundSize)) {
            const [width, height] = backgroundSize.split(' ');
            const [widthValue, widthUnit] = width.match(/[a-zA-Z]+|\d+/g);
            const [heightValue, heightUnit] = height.match(/[a-zA-Z]+|\d+/g);
            setSize({
                width: { value: widthValue, unit: widthUnit },
                height: { value: heightValue, unit: heightUnit }
            });
        }

        if (backgroundPosition && !defaultPositions.includes(backgroundPosition)) {
            const [width, height] = backgroundPosition.split(' ');
            const [widthValue, widthUnit] = width.match(/[a-zA-Z]+|\d+/g);
            const [heightValue, heightUnit] = height.match(/[a-zA-Z]+|\d+/g);
            setPosition({
                width: { value: widthValue, unit: widthUnit },
                height: { value: heightValue, unit: heightUnit }
            });
        }

    }, [backgroundSize]);

    const addItem = (type) => {

        if (type === 'size') {
            const newSize = `${size.width.value}${size.width.unit} ${size.height.value}${size.height.unit}`;
            if (!sizes.includes(newSize)) {
                setSizes(sizes => sizes.splice(sizes.length - 1, 1, newSize));
                updateValue({ size: newSize });
            }
        } else {
            const newPosition = `${position.width.value}${position.width.unit} ${position.height.value}${position.height.unit}`;
            setPositions(positions => positions.splice(positions.length - 1, 1, newPosition));
            updateValue({ position: newPosition });
        }
    };

    const renderOptions = (menu, value, setValue, label) => (
        <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
                <Space.Compact size="large">
                    <Input
                        addonAfter={
                            <Select
                                value={value.width.unit}
                                className={styles.select}
                                disabled={readOnly}
                                onChange={(unit) => setValue(prev => ({ ...prev, width: { ...prev.width, unit } }))}
                            >

                                {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
                            </Select>
                        }
                        className={styles.input}
                        readOnly={readOnly}
                        value={value.width.value}
                        onChange={(e) => setValue(prev => ({ ...prev, width: { ...prev.width, value: e.target.value } }))}
                    />
                    <Input
                        addonAfter={
                            <Select
                                className={styles.select}
                                value={value.height.unit}
                                onChange={(unit) => setValue(prev => ({ ...prev, height: { ...prev.height, unit } }))}
                            >
                                {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
                            </Select>
                        }
                        className={styles.input}
                        value={value.height.value}
                        disabled={readOnly}
                        onChange={(e) => setValue(prev => ({ ...prev, height: { ...prev.height, value: e.target.value } }))}
                    />
                </Space.Compact>
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Apply {label}
                </Button>
            </Space>
        </>
    );

    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>
            <Col className="gutter-row" span={24}>
                <Select
                    value={backgroundSize || 'auto'}
                    disabled={readOnly}
                    onChange={(size) => updateValue({ size })}
                    dropdownRender={(menu) => renderOptions(menu, size, setSize, 'size')}
                    options={sizes.map((item) => ({ label: item, value: item }))}
                />
            </Col>
            <Col className="gutter-row" span={24}>
                <Select
                    onChange={(repeat) => updateValue({ repeat })}
                    value={backgroundRepeat || 'no-repeat'}
                    disabled={readOnly}
                    options={[
                        { label: 'No repeat', value: 'no-repeat' },
                        { label: 'Repeat', value: 'repeat' },
                        { label: 'Repeat X', value: 'repeat-x' },
                        { label: 'Repeat Y', value: 'repeat-y' },
                    ]}
                />
            </Col>
            <Col className="gutter-row" span={24}>
                <Select
                    value={backgroundPosition || 'auto'}
                    disabled={readOnly}
                    onChange={(position) => updateValue({ position })}
                    dropdownRender={(option) => renderOptions(option, position, setPosition, 'position')}
                    options={positions.map((item) => ({ label: item, value: item }))}
                />
            </Col>
        </Row>
    );
};

export default SizeAndRepeat;
