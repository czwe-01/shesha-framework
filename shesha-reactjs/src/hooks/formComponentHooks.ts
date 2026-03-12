import { useMemo, useRef, useState } from "react";
import {
  DataContextTopLevels,
  IApplicationContext,
  IConfigurableFormComponent,
  IFormComponentStyles,
  IStyleType,
  StyleBoxValue,
  executeScriptSync,
  getActualModel,
  getParentReadOnly,
  pickStyleFromModel,
  useAvailableConstantsContexts,
  useAvailableConstantsContextsNoRefresh,
  useCanvas,
  useDeepCompareMemo,
  useSheshaApplication,
  wrapConstantsData,
} from "..";
import { getThemeBaseStyles } from "@/providers/theme/styleUtils";
import { TouchableProxy, makeTouchableProxy } from "@/providers/form/touchableProxy";
import { useParent } from "@/providers/parentProvider";
import { isEqual } from "lodash";
import { getBorderStyle } from "@/designer-components/_settings/utils/border/utils";
import { getFontStyle } from "@/designer-components/_settings/utils/font/utils";
import { getShadowStyle } from "@/designer-components/_settings/utils/shadow/utils";
import { useDeepCompareEffect } from "./useDeepCompareEffect";
import { getBackgroundStyle } from "@/designer-components/_settings/utils/background/utils";
import { jsonSafeParse, removeUndefinedProps } from "@/utils/object";
import { getDimensionsStyle } from "@/designer-components/_settings/utils/dimensions/utils";
import { getOverflowStyle } from "@/designer-components/_settings/utils/overflow/util";
import { isNullOrWhiteSpace } from "@/utils/nullables";

type MayHaveEditMode<T> = T & {
  editMode?: unknown | undefined;
};

export function useActualContextData<T extends object = object>(
  model: T,
  parentReadonly?: boolean,
  additionalData?: object,
  propertyFilter?: (name: string, value: unknown) => boolean,
  executor?: (data: T, context: TouchableProxy<IApplicationContext>) => T,
): T {
  const parent = useParent(false);
  const fullContext = useAvailableConstantsContexts();
  const accessors = wrapConstantsData({ fullContext, topContextId: DataContextTopLevels.All });

  const contextProxyRef = useRef<TouchableProxy<IApplicationContext>>();
  if (!contextProxyRef.current) {
    contextProxyRef.current = makeTouchableProxy<IApplicationContext>(accessors);
  } else {
    contextProxyRef.current.refreshAccessors(accessors);
  }
  if (additionalData)
    contextProxyRef.current.setAdditionalData(additionalData);

  contextProxyRef.current.checkChanged();

  const pReadonly = parentReadonly ?? getParentReadOnly(parent, contextProxyRef.current);

  const prevParentReadonly = useRef(pReadonly);
  const prevModel = useRef<T>();
  const actualModelRef = useRef<T>(model);
  const prevActualModelRef = useRef<string>('');

  let actualModel = undefined;
  const modelChanged = !isEqual(prevModel.current, model);
  if (contextProxyRef.current.changed || modelChanged || !isEqual(prevParentReadonly.current, pReadonly)) {
    const preparedData: MayHaveEditMode<T> = Array.isArray(model)
      ? model
      : { ...model,
        editMode: model.hasOwnProperty('editMode')
          ? (model as MayHaveEditMode<T>).editMode
          : undefined, // add editMode property if not exists
      };

    actualModel = executor
      ? executor(preparedData, contextProxyRef.current)
      : getActualModel(preparedData, contextProxyRef.current, pReadonly, propertyFilter);

    prevActualModelRef.current = JSON.stringify(actualModel);
    prevParentReadonly.current = pReadonly;
  }

  actualModelRef.current = useMemo(() => {
    return actualModel;
    // TODO: Alex, please review. Refs are used by a wrong way here
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevActualModelRef.current]);

  if (modelChanged)
    prevModel.current = model;

  return actualModelRef.current;
}

export function useCalculatedModel<T extends object = object>(
  model: T,
  useCalculateModel: (model: T, allData: IApplicationContext) => T = (_model, _allData) => ({} as T),
  calculateModel?: (model: T, allData: IApplicationContext, useCalculatedModel?: T) => T,
): T {
  const fullContext = useAvailableConstantsContextsNoRefresh();
  const accessors = wrapConstantsData({ fullContext, topContextId: DataContextTopLevels.All });

  const contextProxyRef = useRef<TouchableProxy<IApplicationContext>>();
  if (!contextProxyRef.current) {
    contextProxyRef.current = makeTouchableProxy<IApplicationContext>(accessors);
  } else {
    contextProxyRef.current.refreshAccessors(accessors);
  }
  contextProxyRef.current.checkChanged();
  // TODO: update TouchableProxy<T> to implement T and use without unsafe cast
  const allData = contextProxyRef.current as unknown as IApplicationContext;

  const prevModel = useRef<T>();
  const calculatedModelRef = useRef<T>();
  const useCalculatedModelRef = useRef<T>();

  const useCalculatedModel = useCalculateModel(model, allData);

  const modelChanged = !isEqual(prevModel.current, model);
  const useCalculatedModelChanged = !isEqual(useCalculatedModelRef.current, useCalculatedModel);
  if (contextProxyRef.current.changed || modelChanged || useCalculatedModelChanged) {
    calculatedModelRef.current = calculateModel
      ? calculateModel(model, allData, useCalculatedModel)
      : undefined;
  }

  if (useCalculatedModelChanged)
    useCalculatedModelRef.current = useCalculatedModel;
  if (modelChanged)
    prevModel.current = model;

  // TODO: Alex, please review this code. calculatedModelRef.current may be undefined
  return calculatedModelRef.current as T;
}

export function useActualContextExecution<T = unknown>(code: string | undefined, additionalData: object | undefined, defaultValue: T): T {
  const fullContext = useAvailableConstantsContexts();
  const accessors = wrapConstantsData({ fullContext });

  const contextProxyRef = useRef<TouchableProxy<IApplicationContext>>();
  if (!contextProxyRef.current) {
    contextProxyRef.current = makeTouchableProxy<IApplicationContext>(accessors);
  } else {
    contextProxyRef.current.refreshAccessors(accessors);
  }
  if (additionalData)
    contextProxyRef.current.setAdditionalData(additionalData);

  contextProxyRef.current.checkChanged();

  const prevCode = useRef<string>();
  const actualDataRef = useRef<T>(defaultValue);

  if (contextProxyRef.current.changed || !isEqual(prevCode.current, code)) {
    const result = !isNullOrWhiteSpace(code)
      ? executeScriptSync(code, contextProxyRef.current) as T
      : defaultValue;

    // Only update if result is not undefined, otherwise keep previous value or use default
    actualDataRef.current = result !== undefined ? result : (actualDataRef.current ?? defaultValue);
  }

  prevCode.current = code;

  return actualDataRef.current;
}

export function useActualContextExecutionExecutor<T = unknown, TAdditionalData extends object = object>(executor: (context: IApplicationContext & TAdditionalData) => T, additionalData?: TAdditionalData): T | undefined {
  const fullContext = useAvailableConstantsContextsNoRefresh();
  const accessors = wrapConstantsData({ fullContext });

  const contextProxyRef = useRef<TouchableProxy<IApplicationContext>>();
  if (!contextProxyRef.current) {
    contextProxyRef.current = makeTouchableProxy<IApplicationContext>(accessors);
  } else {
    contextProxyRef.current.refreshAccessors(accessors);
  }
  if (additionalData)
    contextProxyRef.current.setAdditionalData(additionalData);

  contextProxyRef.current.checkChanged();
  // TODO: update TouchableProxy<T> to implement T and use without unsafe cast
  const allData = contextProxyRef.current as unknown as IApplicationContext & TAdditionalData;

  const prevCode = useRef(executor);
  const actualDataRef = useRef<T>(undefined);

  if (contextProxyRef.current.changed || prevCode.current !== executor) {
    actualDataRef.current = executor(allData);
  }

  prevCode.current = executor;

  return actualDataRef.current;
};

export interface UseFormComponentStylesOptions {
  /**
   * The component category for applying theme defaults.
   * - 'inputComponents': Form input fields (isInput: true)
   * - 'layoutComponents': Container components (panel, card, wizard, tabs, etc.)
   * - 'standardComponents': Display components (statistic, charts, etc.) - only margin/padding from theme
   * - 'inlineComponents': Inline elements (icon, text, link, button) - only margin/padding from theme
   */
  componentCategory?: 'inputComponents' | 'layoutComponents' | 'standardComponents' | 'inlineComponents';
}

export const useFormComponentStyles = <TModel>(
  model: TModel & IStyleType & Omit<IConfigurableFormComponent, 'id' | 'type'>,
  options?: UseFormComponentStylesOptions,
): IFormComponentStyles => {
  const app = useSheshaApplication();
  const { theme } = useTheme();
  
  const jsStyle = useActualContextExecution(model.style, undefined, {}); // use default style if empty or error
  const { designerWidth } = useCanvas();

  // Get theme base styles for the component category
  const themeBaseStyles = useMemo(() => {
    if (!options?.componentCategory) return {} as IStyleType;
    return getThemeBaseStyles(theme, options.componentCategory);
  }, [theme, options?.componentCategory]);

  // Merge theme base styles with model styles, with model styles taking precedence
  // For standardComponents and inlineComponents, only stylingBox is applied from theme
  const { dimensions, border, font, shadow, background, stylingBox, overflow } = model;
  
  // Apply theme stylingBox as base if component doesn't have one
  const effectiveStylingBox = stylingBox ?? themeBaseStyles?.stylingBox;
  
  // For layoutComponents, also apply theme background, border, shadow as base
  const effectiveBackground = background ?? (options?.componentCategory === 'layoutComponents' ? themeBaseStyles?.background : undefined);
  const effectiveBorder = border ?? (options?.componentCategory === 'layoutComponents' ? themeBaseStyles?.border : undefined);
  const effectiveShadow = shadow ?? (options?.componentCategory === 'layoutComponents' ? themeBaseStyles?.shadow : undefined);

  const [backgroundStyles, setBackgroundStyles] = useState(
    effectiveBackground && effectiveBackground.storedFile?.id && effectiveBackground.type === 'storedFile'
      ? {
        backgroundImage: `url(${app.backendUrl}/api/StoredFile/Download?id=${effectiveBackground.storedFile.id})`,
        backgroundSize: effectiveBackground.size,
        backgroundPosition: effectiveBackground.position,
        backgroundRepeat: effectiveBackground.repeat,
      }
      : getBackgroundStyle(effectiveBackground, jsStyle),
  );

  const stylingBoxParsed = useMemo(() => jsonSafeParse<StyleBoxValue>(effectiveStylingBox || '{}') ?? {}, [effectiveStylingBox]);

  const dimensionsStyles = useMemo(() => getDimensionsStyle(dimensions, stylingBoxParsed, designerWidth), [dimensions, stylingBoxParsed, designerWidth]);
  const borderStyles = useMemo(() => getBorderStyle(effectiveBorder, jsStyle), [effectiveBorder, jsStyle]);
  const fontStyles = useMemo(() => getFontStyle(font), [font]);
  const shadowStyles = useMemo(() => getShadowStyle(effectiveShadow), [effectiveShadow]);
  const stylingBoxAsCSS = useMemo(() => pickStyleFromModel(stylingBoxParsed), [stylingBoxParsed]);
  const overflowStyles = useMemo(() => overflow ? getOverflowStyle(overflow, false) : {}, [overflow]);

  useDeepCompareEffect(() => {
    if (effectiveBackground && effectiveBackground.storedFile?.id && effectiveBackground.type === 'storedFile') {
      fetch(`${app.backendUrl}/api/StoredFile/Download?id=${effectiveBackground.storedFile.id}`,
        { headers: { ...app.httpHeaders, "Content-Type": "application/octet-stream" } })
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const style = getBackgroundStyle(effectiveBackground, jsStyle, url);
          setBackgroundStyles(style);
        });
    } else {
      setBackgroundStyles(getBackgroundStyle(effectiveBackground, jsStyle));
    }
  }, [effectiveBackground, jsStyle, app.backendUrl, app.httpHeaders]);

  const appearanceStyle = useMemo(() => removeUndefinedProps(
    {
      ...stylingBoxAsCSS,
      ...dimensionsStyles,
      ...borderStyles,
      ...fontStyles,
      ...backgroundStyles,
      ...shadowStyles,
      ...overflowStyles,
      fontWeight: fontStyles.fontWeight || 400,
    }), [stylingBoxAsCSS, dimensionsStyles, borderStyles, fontStyles, backgroundStyles, shadowStyles, overflowStyles]);

  const fullStyle = useDeepCompareMemo(() => ({ ...appearanceStyle, ...jsStyle }), [appearanceStyle, jsStyle]);

  // Build theme config from theme base styles
  const themeConfig = useMemo(() => {
    if (!options?.componentCategory || !themeBaseStyles) return undefined;
    
    const config: IFormComponentStyles['themeConfig'] = {};
    
    // Add layout-specific properties
    if (options.componentCategory === 'layoutComponents') {
      config.gridGapHorizontal = themeBaseStyles.gridGapHorizontal;
      config.gridGapVertical = themeBaseStyles.gridGapVertical;
    }
    
    // Add input-specific properties
    if (options.componentCategory === 'inputComponents') {
      config.labelAlign = themeBaseStyles.labelAlign;
      config.labelColon = themeBaseStyles.labelColon;
      config.labelSpan = themeBaseStyles.labelSpan;
      config.contentSpan = themeBaseStyles.contentSpan;
    }
    
    // Only return if we have properties
    return Object.keys(config).length > 0 ? config : undefined;
  }, [themeBaseStyles, options?.componentCategory]);

  const allStyles: IFormComponentStyles = useMemo(() => ({
    stylingBoxAsCSS,
    dimensionsStyles,
    borderStyles,
    fontStyles,
    backgroundStyles,
    shadowStyles,
    overflowStyles,
    jsStyle,
    appearanceStyle,
    fullStyle,
    themeConfig,
  }), [stylingBoxAsCSS, dimensionsStyles, borderStyles, fontStyles, backgroundStyles, shadowStyles, overflowStyles, jsStyle, appearanceStyle, fullStyle, themeConfig]);

  return allStyles;
};
