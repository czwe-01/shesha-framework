import { ComponentType, JSX, ReactNode } from 'react';
import { SplitLayout } from '@/components/splitLayout';
import { useFormDesignerFormMode, useFormDesignerSelectedComponent } from '@/providers/formDesigner';
import { ComponentPropertiesPanel } from '../componentPropertiesPanel';
import { ComponentTitleButtons } from '../componentTitleButtons';
import { isDefined } from '@/utils';
import { useFormDesignerComponentGetter } from '@/providers/form/hooks';

export const withPropertiesPanel = <P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> => {
  return function WithPropertiesPanel(props: P): ReactNode {
    const component = useFormDesignerSelectedComponent();
    const formMode = useFormDesignerFormMode();
    const getToolboxComponent = useFormDesignerComponentGetter();
    const isDesigner = formMode === 'designer';
    const defaultPanelSize = typeof window !== 'undefined' ? (15 / 100) * window.innerWidth : 350;

    if (!isDesigner) {
      return <WrappedComponent {...props} />;
    }

    const label = isDefined(component) && typeof (component.label) === 'string'
      ? component.label
      : 'Properties';
    const icon = isDefined(component) ? getToolboxComponent(component.type)?.icon : undefined;

    return (
      <SplitLayout
        orientation="horizontal"
        position="end"
        panel={<ComponentPropertiesPanel />}
        defaultPanelSize={defaultPanelSize}
        panelTitle={isDefined(icon)
          ? <><span style={{ marginInlineEnd: 6 }}>{icon}</span>{label}</>
          : label}
        panelExtra={<ComponentTitleButtons />}
      >
        <WrappedComponent {...props} />
      </SplitLayout>
    );
  };
};
