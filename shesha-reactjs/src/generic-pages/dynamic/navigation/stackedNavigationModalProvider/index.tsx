import React, { FC, PropsWithChildren, useContext } from 'react';
import { StackedNavigationModalStateContext } from './contexts';

export interface StackedNavigationModalProviderProps {
  isMaxWidth?: boolean;
  parentId?: string;
}

const StackedNavigationModalProvider: FC<PropsWithChildren<StackedNavigationModalProviderProps>> = ({
  children,
  isMaxWidth,
  parentId,
}) => {
  return (
    <StackedNavigationModalStateContext.Provider
      value={{
        isMaxWidth,
        parentId,
      }}
    >
      {children}
    </StackedNavigationModalStateContext.Provider>
  );
};

function useStackedModal() {
  return useContext(StackedNavigationModalStateContext);
}

export { StackedNavigationModalProvider, useStackedModal };
