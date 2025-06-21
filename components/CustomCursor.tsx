'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const cursorLogoRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };
        
        const addClickClass = () => cursorRef.current?.classList.add('click');
        const removeClickClass = () => cursorRef.current?.classList.remove('click');
        const hideCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
        };
        const showCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', addClickClass);
        document.addEventListener('mouseup', removeClickClass);
        document.documentElement.addEventListener('mouseleave', hideCursor);
        document.documentElement.addEventListener('mouseenter', showCursor);

        let outerX = 0, outerY = 0;
        let innerX = 0, innerY = 0;
        
        const loop = () => {
            innerX = mousePos.current.x;
            innerY = mousePos.current.y;
            outerX += (mousePos.current.x - outerX) * 0.15;
            outerY += (mousePos.current.y - outerY) * 0.15;

            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.left = `${innerX}px`;
                cursorInnerRef.current.style.top = `${innerY}px`;
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.left = `${outerX}px`;
                cursorOuterRef.current.style.top = `${outerY}px`;
            }
            if (cursorLogoRef.current) {
                cursorLogoRef.current.style.left = `${outerX}px`;
                cursorLogoRef.current.style.top = `${outerY}px`;
            }
            
            requestRef.current = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', addClickClass);
            document.removeEventListener('mouseup', removeClickClass);
            document.documentElement.removeEventListener('mouseleave', hideCursor);
            document.documentElement.removeEventListener('mouseenter', showCursor);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const router = useRouter();

    useEffect(() => {
        const addHoverClass = () => cursorRef.current?.classList.add('hover');
        const removeHoverClass = () => cursorRef.current?.classList.remove('hover');

        const hoverElements = document.querySelectorAll('a, button, [data-hover]');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', addHoverClass);
            element.addEventListener('mouseleave', removeHoverClass);
        });
        
        return () => {
             hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', addHoverClass);
                element.removeEventListener('mouseleave', removeHoverClass);
            });
        }
    }, [router.asPath]);

    return (
        <div className="cursor" ref={cursorRef}>
            <div className="cursor-outer" ref={cursorOuterRef}></div>
            <div className="cursor-inner" ref={cursorInnerRef}></div>
            <div className="cursor-logo" ref={cursorLogoRef}>e.st</div>
        </div>
    );
};

export default CustomCursor; 