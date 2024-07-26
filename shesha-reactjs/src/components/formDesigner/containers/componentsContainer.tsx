import React, { CSSProperties, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { IConfigurableFormComponent } from '@/providers/form/models';
import { IComponentsContainerBaseProps } from '@/interfaces';
import { useComponentContainer } from '@/providers/form/nesting/containerContext';
import { ICommonContainerProps } from '@/designer-components/container/interfaces';
import { useStoredFile } from '@/index';
import { isValidGuid } from '../components/utils';
import { IBackgroundValue } from '@/designer-components/styleBackground/components/background/interfaces';

export interface IComponentsContainerProps extends IComponentsContainerBaseProps, ICommonContainerProps {
  className?: string;
  render?: (components: JSX.Element[]) => ReactNode;
  itemsLimit?: number;
  dynamicComponents?: IConfigurableFormComponent[];
  wrapperStyle?: CSSProperties;
  style?: CSSProperties;
  dataSource?: string;
  storedFileId?: string;
  background?: IBackgroundValue;
}

const ComponentsContainer: FC<IComponentsContainerProps> = (props) => {
4
  const { getStoredFile } = useStoredFile(false) ?? {};
  const [storedFile, setStoredFile] = useState<string>();

  const storedFileId = props?.background?.storedFile?.id;
  const isStoredFileId = props?.background?.type === 'storedFile' && Boolean(storedFileId);

  const fetchStoredFile = () => {
    if (isStoredFileId && isValidGuid(storedFileId)) {
      getStoredFile({ id: storedFileId }).then((file: string) => {
        setStoredFile(() => file);
      });
    }
  };

  useEffect(() => {
    fetchStoredFile();
  }, [isStoredFileId, props?.storedFileId]);

  const ContainerComponent = useComponentContainer();

  const updatedProps = useMemo(() => {
    const updatedStyles = { ...props.style, background: `url(data:image/png;base64,${storedFile})` };
    return { ...{ ...props, style: isStoredFileId === true ? updatedStyles : props.style } };
  }, [props, props?.storedFileId, storedFile]);

  return (
    <ContainerComponent {...updatedProps} />
  );

};

export default ComponentsContainer;
