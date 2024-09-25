import { ButtonGroupItemProps } from '@/providers/buttonGroupConfigurator/models';
import { useDynamicActionsDispatcher } from '@/providers/index';
import { FC, useEffect } from 'react';
import { DYNAMIC_ACTIONS_CONTEXT_INITIAL_STATE, IDynamicActionsContext } from '../contexts';
import { IResolvedDynamicItem } from './utils';

interface SingleDynamicItemEvaluatorProps {
  item: IResolvedDynamicItem;
  onEvaluated: (response: ButtonGroupItemProps[]) => void;
}

const EMPTY_ITEMS = [];
const DEFAULT_DYNAMIC_EVALUATOR: IDynamicActionsContext = {
  ...DYNAMIC_ACTIONS_CONTEXT_INITIAL_STATE,
  useEvaluator: () => EMPTY_ITEMS, // note: it's important to use constant to prevent infinite re-calculation ([] !== [])
};

/**
 * Pseudo-component with no UI, is used as a proxy for evaluation of the dynamic items
 */

export const SingleDynamicItemEvaluator: FC<SingleDynamicItemEvaluatorProps> = ({ item, onEvaluated }) => {
  const dispatcher = useDynamicActionsDispatcher();

  const { providerUid } = item?.dynamicItemsConfiguration ?? {};
  const providers = dispatcher.getProviders();
  const provider = providerUid ? providers[providerUid] : undefined;
  const actionsContext = provider ? provider.contextValue : DEFAULT_DYNAMIC_EVALUATOR;

  // call a hook
  const evaluatedItems = actionsContext.useEvaluator({
    item,
    settings: item?.dynamicItemsConfiguration?.settings,
  });

  useEffect(() => {
    item.resolvedItems = evaluatedItems;
    item.isResolved = true;
    onEvaluated(evaluatedItems);
  }, [evaluatedItems]);

  return null;
};