import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { toBase64 } from './utils';

const ImageUploader = ({ onChange, backgroundImage, readOnly }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (backgroundImage?.file) {
            const { uid, name, url } = backgroundImage;
            setFileList([
                {
                    uid,
                    name,
                    status: 'done',
                    url,
                },
            ]);
        }
    }, [backgroundImage]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await toBase64(file.originFileObj as File);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            const base64Image = await toBase64(newFileList[0].originFileObj as File);
            const newFile = fileList[fileList.length - 1];
            onChange({ url: base64Image, name: newFile.fileName, uid: newFile.uid });
        } else if (newFileList.length === 0) {
            onChange({});
        }
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <div style={{ position: 'relative' }}>
            <Upload
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={() => setFileList([])}
                onChange={handleChange}
                beforeUpload={() => false}
                disabled={readOnly}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Image
                style={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                }}
                src={previewImage}
            />
        </div>
    );
};
export default ImageUploader;