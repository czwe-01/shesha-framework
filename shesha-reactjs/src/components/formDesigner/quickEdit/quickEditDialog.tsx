import React, { FC, useState } from 'react';
import { FormIdentifier } from '@/interfaces';
import { Modal, Tabs } from 'antd';
import { FormDesigner } from '../index';
import { DesignerMainArea } from '../designerMainArea/index';
import { QuickEditToolbar } from './quickEditToolbar';
import { FormConfigurationDto } from '@/providers/form/api';
import { useMainStyles } from '../styles/styles';

export interface IQuickEditDialogProps {
    open: boolean;
    onCancel: () => void;
    onUpdated: () => void;
    formIds: FormIdentifier[];
}

export const QuickEditDialog: FC<IQuickEditDialogProps> = (props) => {
    const { styles } = useMainStyles();
    const { open, onCancel, onUpdated, formIds } = props;
    const [activeFormId, setActiveFormId] = useState<FormIdentifier | null>(formIds.length > 0 ? formIds[0] : null);
    const [latestFormVersions, setLatestFormVersions] = useState<Record<string, FormIdentifier>>({});

    const onNewVersionCreated = (newVersion: FormConfigurationDto) => {
        setLatestFormVersions(prev => ({
            ...prev,
            [activeFormId as string]: newVersion.id
        }));
    };

    const handleTabChange = (activeKey: string) => {
        setActiveFormId(activeKey);
    };

    const getFormId = (id: FormIdentifier) => {
        return latestFormVersions[id as string] || id;
    };

    if (!open) return null;

    const renderActiveTabContent = () => {
        if (!activeFormId) return null;
        
        return (
            <FormDesigner.NonVisual formId={getFormId(activeFormId)}>
                <div className={styles.formDesigner}>
                    <QuickEditToolbar 
                        renderSource='modal'
                        onUpdated={onUpdated}
                        onNewVersionCreated={onNewVersionCreated}
                    />
                    <DesignerMainArea />
                </div>
            </FormDesigner.NonVisual>
        );
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            width={'calc(100vw)'}
            footer={null}
            className={styles.quickEditModal}
        >
            <Tabs 
                activeKey={activeFormId as string}
                onChange={handleTabChange}
                type="card"
                items={formIds.map((id) => ({
                    key: id as string,
                    label: `Form ${id}`,
                    children: <div /> 
                }))}
            />
            {renderActiveTabContent()}
        </Modal>
    );
};