import { Button, Col, Input, Radio, RadioChangeEvent, Row, Tag } from 'antd';
import { Autocomplete } from '@/components/autocomplete';
import React, { FC, useState } from 'react';
import { BgColorsOutlined, DatabaseOutlined, FormatPainterOutlined, LinkOutlined, UploadOutlined } from '@ant-design/icons';
import { ColorPicker } from '@/components';
import SizeAndRepeat from './sizeAndRepeat';
import ImageUploader from '../imageUploader';
import { IBackgroundValue } from './interfaces';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';
import { IContainerComponentProps } from '@/interfaces';

interface IBackgroundProps {
    onValuesChange?: (value: IContainerComponentProps) => void;
    value?: IBackgroundValue;
    model?: any;
    readOnly?: boolean;
}

const BackgroundConfigurator: FC<IBackgroundProps> = ({ onValuesChange, value, model, readOnly }) => {
    const [colors, setColors] = useState<string[]>(value?.gradient?.colors || []);

    const updateValue = (newValue: Partial<IBackgroundValue>) => {
        const updatedValue = { ...model, background: { ...value, ...newValue } };
        onValuesChange(updatedValue);
    };

    const onTypeChange = (e: RadioChangeEvent) => {
        updateValue({ type: e.target.value as IBackgroundValue['type'] });
    };

    const addColor = () => {
        const newColors = [...colors, ''];
        setColors(newColors);
        updateValue({ gradient: { ...value?.gradient, colors: newColors } });
    };

    const updateColor = (color: string, index: number) => {
        const newColors = colors?.map((c, i) => (i === index ? color : c));
        setColors(newColors);
        updateValue({ gradient: { ...value?.gradient, colors: newColors } });
        updateValue({ gradient: { ...value?.gradient, colors: newColors } });
    };

    const removeColor = (index: number) => {
        const newColors = colors?.filter((_, i) => i !== index);
        setColors(newColors);
        updateValue({ gradient: { ...value?.gradient, colors: newColors } });
        updateValue({ gradient: { ...value?.gradient, colors: newColors } });
    };

    const renderBackgroundInput = () => {
        switch (value?.type) {
            case 'gradient':
                return (
                    <>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.gradient.direction" label="Direction" jsSetting>
                                <Input

                                    style={{ width: '100%' }}
                                    value={value?.gradient?.direction}
                                    readOnly={readOnly}
                                    onChange={(e) => updateValue({ gradient: { ...value?.gradient, direction: e.target.value } })}
                                />
                            </SettingsFormItem>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.gradient.colors" label="Colors" jsSetting>
                                <div>
                                    {colors.map((color, i) => (
                                        <Tag
                                            key={i}
                                            bordered={false}
                                            closable
                                            onClose={(e) => {
                                                e.preventDefault();
                                                removeColor(i);
                                            }}
                                        >
                                            <ColorPicker
                                                allowClear
                                                value={color}
                                                readOnly={readOnly}
                                                onChange={(newColor) => updateColor(newColor.toString(), i)}
                                            />
                                        </Tag>
                                    ))}
                                </div>
                            </SettingsFormItem>
                        </Col>
                        <Button onClick={addColor}>Add color</Button>
                    </>
                );
            case 'url':
                return (
                    <Col className="gutter-row" span={24}>
                        <SettingsFormItem name="background.url" label="URL" jsSetting>
                            <Input

                                style={{ width: '100%' }}
                                value={value?.url}
                                readOnly={readOnly}
                                onChange={(e) => updateValue({ url: e.target.value })}
                            />
                        </SettingsFormItem>
                    </Col>
                );
            case 'upload':
                return (
                    <Col className="gutter-row" span={24}>
                        <SettingsFormItem name="background.file" label="File" jsSetting>
                            <ImageUploader
                                updateValue={updateValue}
                                backgroundImage={value?.file}
                                readOnly={readOnly}
                            />
                        </SettingsFormItem>
                    </Col>

                );
            case 'storedFile':
                return (
                    <>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.storedFile.id" label="File Id" jsSetting>
                                <Input

                                    style={{ width: '100%' }}
                                    readOnly={readOnly}
                                    value={value?.storedFile?.id}
                                    onChange={(e) => updateValue({ storedFile: { ...value?.storedFile, id: e.target.value } })} />
                            </SettingsFormItem>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.storedFile.ownerType" label="Owner Type" jsSetting>
                                <Autocomplete.Raw
                                    dataSourceType="url"
                                    dataSourceUrl="/api/services/app/Metadata/TypeAutocomplete"

                                    readOnly={readOnly}
                                    style={{ width: '100%' }}
                                    value={value?.storedFile?.ownerType}
                                    onChange={(e) => updateValue({ storedFile: { ...value?.storedFile, ownerType: e } })} />
                            </SettingsFormItem>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.storedFile.ownerId" label="Owner Id" jsSetting>
                                <Input

                                    style={{ width: '100%' }}
                                    readOnly={readOnly}
                                    value={value?.storedFile?.ownerId}
                                    onChange={(e) => updateValue({ storedFile: { ...value?.storedFile, ownerId: e.target.value } })} />
                            </SettingsFormItem>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.storedFile.fileCatergory" label="File Catergory" jsSetting>
                                <Input

                                    style={{ width: '100%' }}
                                    readOnly={readOnly}
                                    value={value?.storedFile?.fileCatergory}
                                    onChange={(e) => updateValue({ storedFile: { ...value?.storedFile, fileCatergory: e.target.value } })} />
                            </SettingsFormItem>
                        </Col>
                    </>
                );
            default:
                return (
                    <Col className="gutter-row" span={24}>
                        <Col className="gutter-row" span={24}>
                            <SettingsFormItem name="background.color" label="Color" jsSetting>
                                <ColorPicker
                                    allowClear
                                    readOnly={readOnly}
                                    value={value?.color}
                                    onChange={(color) => updateValue({ color: color.toString() })}
                                />
                            </SettingsFormItem>
                        </Col>
                    </Col>
                );
        }
    };

    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>
            <SettingsFormItem readOnly={readOnly} name="background.type" label="Type" jsSetting>
                <Col className="gutter-row" span={24}>
                    <Radio.Group onChange={onTypeChange} disabled={readOnly} value={value?.type}>
                        <Radio.Button value="color" title='Background color'><FormatPainterOutlined /></Radio.Button>
                        <Radio.Button value="gradient" title='Gradient background'><BgColorsOutlined /></Radio.Button>
                        <Radio.Button value="url" title='Image url'><LinkOutlined /></Radio.Button>
                        <Radio.Button value="upload" title='Image upload'><UploadOutlined /></Radio.Button>
                        <Radio.Button value="storedFile" title='Stored File'><DatabaseOutlined /></Radio.Button>
                    </Radio.Group>

                </Col>
            </SettingsFormItem>
            {renderBackgroundInput()}
            <SizeAndRepeat readOnly={readOnly} updateValue={updateValue} backgroundSize={value?.size} backgroundPosition={value?.position} backgroundRepeat={value?.repeat} />
        </Row>
    );
};

export default BackgroundConfigurator;