import { IKeyInformationBarProps } from '@/designer-components/keyInformationBar/interfaces';
import { ComponentsContainer, useFormData } from '@/index';
import { getStyle, pickStyleFromModel } from '@/providers/form/utils';
import { Flex } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
import { useStyles } from './style';
import { addAnimation, addPx } from './utils';
export const KeyInformationBar: FC<IKeyInformationBarProps> = (props) => {

    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollerInner = useRef<HTMLDivElement>(null);

    const { data } = useFormData();
    const { columns, overflow, hidden, orientation, style, dividerMargin, dividerHeight, dividerWidth, dividerThickness, dividerColor, gap, stylingBox, alignItems, backgroundColor } = props;
    const { styles } = useStyles();

    const width = addPx(dividerWidth);
    const height = addPx(dividerHeight);
    const margin = dividerMargin ? addPx(dividerMargin) : 0;

    if (hidden) return null;

    const stylingBoxJSON = JSON.parse(stylingBox || '{}');
    const vertical = orientation === "vertical";
    const computedStyle = { ...getStyle(style, data), ...pickStyleFromModel(stylingBoxJSON) };
    const barStyle = !vertical ? { justifyContent: alignItems, backgroundColor } : { alignItems: alignItems, backgroundColor };

    const containerStyle = (item) => ({
        textAlign: item.textAlign,
        display: "flex",
        flexDirection: item.flexDirection ? item.flexDirection : "column",
        alignItems: item.textAlign,
        overflow: "hidden",
        textOverflow: "ellipsis",
    });

    const divThickness = addPx(dividerThickness || '0.62px');

    const dividerStyle = {
        backgroundColor: dividerColor ?? '#b4b4b4',
        width: !vertical && width ? divThickness : width,
        height: vertical && height ? divThickness : height,
        margin: vertical ? `${margin} 0` : `0 ${margin}`,
    };

    useEffect(() => {
        if (!vertical) addAnimation(scrollerRef, 10, scrollerInner, overflow);
    }, [overflow]);

    return (
        <div style={{ width: '100%', overflow: 'hidden' }} ref={scrollerRef}>
            <Flex ref={scrollerInner} vertical={vertical} className={styles.flexContainer} style={{ ...computedStyle, ...barStyle }} >
                {columns.map((item, i) => {
                    const itemWidth = vertical ? "100%" : addPx(item.width);
                    return (
                        <div key={item.id} className={vertical ? styles.flexItemWrapperVertical : styles.flexItemWrapper} style={vertical ? { width: itemWidth, justifyContent: alignItems } : {
                            ...(overflow === 'animated' ? { minWidth: itemWidth } : { maxWidth: itemWidth })
                        }}>
                            <div key={"divider" + i} className={styles.divider} style={{ ...dividerStyle, alignSelf: "center" }} />
                            <div className={styles.content} style={{ justifyContent: item.textAlign }}>
                                <ComponentsContainer
                                    containerId={item.id}
                                    gap={gap}
                                    wrapperStyle={{ padding: item.padding, maxWidth: vertical ? '100%' : addPx(item.width), boxSizing: "border-box" }}
                                    style={containerStyle(item)}
                                    dynamicComponents={props?.isDynamic ? item?.components : []}
                                />
                            </div>
                        </div>);
                })}
            </Flex>
        </div>
    );
};

export default KeyInformationBar;