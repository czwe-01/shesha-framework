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
  useTheme,
  wrapConstantsData,
} from "..";
import { getThemeBaseStyles, IThemeStyleType } from "@/providers/theme/styleUtils";
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
import { IBackgroundValue } from "@/designer-components/_settings/utils/background/interfaces";
import { IBorderValue } from "@/designer-components/_settings/utils/border/interfaces";
import { IShadowValue } from "@/designer-components/_settings/utils/shadow/interfaces";

/**
 * Deep merges theme defaults with model values, where model values take precedence.
 * Only falls back to theme for keys that are undefined/null in the model.
 */
const mergeWithThemeDefaults = <T extends object>(
  modelValue: T | undefined,
  themeDefault: T | undefined,
): T | undefined => {
  if (!themeDefault) return modelValue;
  if (!modelValue) return themeDefault;

  const result = { ...modelValue } as Record<string, unknown>;

  for (const key of Object.keys(themeDefault)) {
    const modelVal = result[key];
    const themeVal = (themeDefault as Record<string, unknown>)[key];

    if (modelVal === undefined || modelVal === null) {
      // If model doesn't have this key, use theme default
      result[key] = themeVal;
    } else if (
      typeof modelVal === "object" &&
      !Array.isArray(modelVal) &&
      typeof themeVal === "object" &&
      themeVal !== null
    ) {
      // Deep merge nested objects
      result[key] = mergeWithThemeDefaults(
        modelVal as Record<string, unknown>,
        themeVal as Record<string, unknown>,
      );
    }
    // Otherwise keep model value (it takes precedence)
  }

  return result as T;
};


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

export interface IUseFormComponentStylesOptions {
  /** Use wrapperStyle instead of style for jsStyle calculation (for container components) */
  useWrapperStyle?: boolean;
  /** Component category for applying theme defaults */
  componentCategory?: 'inputComponents' | 'layoutComponents' | 'standardComponents' | 'inlineComponents';
}

export const useFormComponentStyles = <TModel>(
  model: TModel & IStyleType & Omit<IConfigurableFormComponent, 'id' | 'type'>,
  options?: IUseFormComponentStylesOptions,
): IFormComponentStyles => {
  const app = useSheshaApplication();
  const { useWrapperStyle, componentCategory } = options || {};
  const themeContext = useTheme();
  const theme = themeContext?.theme;

  // Get theme defaults based on component category
  const themeDefaults = useMemo(() => {
    if (!componentCategory || !theme) return {} as IThemeStyleType;
    return getThemeBaseStyles(theme, componentCategory);
  }, [theme, componentCategory]);

  // For container components, use wrapperStyle instead of style
  const styleSource = useWrapperStyle && model.wrapperStyle ? (model).wrapperStyle : model.style;
  const jsStyle = useActualContextExecution(styleSource, undefined, {}); // use default style if empty or error
  const { designerWidth } = useCanvas();

  // Use model values with theme defaults as fallback (per-key merge)
  const {
    dimensions,
    border: modelBorder,
    font: modelFont,
    shadow: modelShadow,
    background: modelBackground,
    stylingBox: modelStylingBox,
    overflow: modelOverflow,
  } = model;

  // Apply theme defaults per-key, so if a key is missing in model, theme value is used
  const background = mergeWithThemeDefaults<IBackgroundValue>(
    modelBackground,
    themeDefaults.background,
  );
  const border = mergeWithThemeDefaults<IBorderValue>(
    modelBorder,
    themeDefaults.border as IBorderValue,
  );
  const shadow = mergeWithThemeDefaults<IShadowValue>(
    modelShadow,
    themeDefaults.shadow as IShadowValue,
  );
  const stylingBox = modelStylingBox ?? themeDefaults.stylingBox;
  const overflow = modelOverflow;

  const [backgroundStyles, setBackgroundStyles] = useState(
    background && background.storedFile?.id && background.type === 'storedFile'
      ? {
        backgroundImage: `url(${app.backendUrl}/api/StoredFile/Download?id=${background.storedFile.id})`,
        backgroundSize: background.size,
        backgroundPosition: background.position,
        backgroundRepeat: background.repeat,
      }
      : getBackgroundStyle(background, jsStyle),
  );

  const stylingBoxParsed = useMemo(() => jsonSafeParse<StyleBoxValue>(stylingBox || '{}') ?? {}, [stylingBox]);

  const borderStyles = useMemo(() => getBorderStyle(border, jsStyle), [border, jsStyle]);
  const font = modelFont;
  const fontStyles = useMemo(() => getFontStyle(font), [font]);
  const shadowStyles = useMemo(() => getShadowStyle(shadow), [shadow]);
  const stylingBoxAsCSS = useMemo(() => pickStyleFromModel(stylingBoxParsed), [stylingBoxParsed]);
  const dimensionsStyles = useMemo(() => getDimensionsStyle(dimensions, designerWidth, undefined), [dimensions, designerWidth]);
  const overflowStyles = useMemo(() => overflow ? getOverflowStyle(overflow, false) : {}, [overflow]);

  useDeepCompareEffect(() => {
    if (background && background.storedFile?.id && background.type === 'storedFile') {
      fetch(`${app.backendUrl}/api/StoredFile/Download?id=${background.storedFile.id}`,
        { headers: { ...app.httpHeaders, "Content-Type": "application/octet-stream" } })
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const style = getBackgroundStyle(background, jsStyle, url);
          setBackgroundStyles(style);
        });
    } else {
      setBackgroundStyles(getBackgroundStyle(background, jsStyle));
    }
  }, [background, jsStyle, app.backendUrl, app.httpHeaders]);

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

  // Extract margin styles for wrapper use
  const margins = useMemo(() => ({
    marginTop: fullStyle.marginTop,
    marginBottom: fullStyle.marginBottom,
    marginLeft: fullStyle.marginLeft,
    marginRight: fullStyle.marginRight,
  }), [fullStyle.marginTop, fullStyle.marginBottom, fullStyle.marginLeft, fullStyle.marginRight]);

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
    margins,
  }), [stylingBoxAsCSS, dimensionsStyles, borderStyles, fontStyles, backgroundStyles, shadowStyles, overflowStyles, jsStyle, appearanceStyle, fullStyle, margins]);

  return allStyles;
};
