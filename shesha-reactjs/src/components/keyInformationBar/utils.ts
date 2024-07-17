import { Ref, RefObject } from "react";

export const addPx = (value) => {
    value = (value == null || value === '' || value === undefined) ? "100%" : value;
    return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
};

export const strings = {
    tooltip: 'You can use any unit (%, px, em, etc). px by default if without unit',
};

export function addAnimation(scroller: RefObject<HTMLDivElement>, duration, scrollerInner: RefObject<HTMLDivElement>, overflow) {

    if (!scroller.current || overflow !== 'animated') {
        scrollerInner.current.style.animation = 'none'
        return;
    };

    scrollerInner.current.style.animation = `scrollHorizontal ${duration}s linear infinite`;

    scrollerInner.current.addEventListener('mouseenter', () => {
        scrollerInner.current.style.animationPlayState = 'paused';
    });

    scrollerInner.current.addEventListener('mouseleave', () => {
        scrollerInner.current.style.animationPlayState = 'running';
    });

    const scrollerContent = Array.from(scrollerInner.current.children);

    const targets = scrollerInner.current.querySelectorAll('[aria-hidden="true"]');
    targets.forEach(child => scrollerInner.current.removeChild(child));

    scrollerContent.forEach((item: HTMLElement) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", 'true');
        scrollerInner.current.appendChild(clone);
    })
}