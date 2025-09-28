"use client";

import { useEffect, useRef, useState } from "react";

export type SetupProps = {
    canvas: HTMLCanvasElement;
}

export type DrawProps = {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    time: number;
    deltaTime: number;
}

export type DrawingBoardProps = {
    className?: string;
    setup?: (props: SetupProps) => void;
    draw: (props: DrawProps) => void;
}

export const DrawingBoard = (props: DrawingBoardProps) => {
    const {
        className,
        setup = () => {},
        draw,
    } = props;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const initialTimestamp = useRef<number>(Date.now());

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {

        if (!canvasRef.current) return;

        setup({ canvas: canvasRef.current });
        contextRef.current = canvasRef.current.getContext("2d");

    }, [canvasRef, setup]);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!contextRef.current) return;
        
        let lastTimestamp = performance.now();
        let animationId: number;

        const animate = (currentTimestamp: number) => {
            const deltaTime = currentTimestamp - lastTimestamp;
            lastTimestamp = currentTimestamp;
            
            const drawProps: DrawProps = {
                context: contextRef.current!,
                width: canvasRef.current!.width,
                height: canvasRef.current!.height,
                time: currentTimestamp - initialTimestamp.current,
                deltaTime,
            };

            draw(drawProps);
            
            animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        
        return () => cancelAnimationFrame(animationId);

    }, [canvasRef, contextRef, draw]);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {

            if (entries.length === 0) return;

            setWidth(entries[0].contentRect.width ?? 0);
            setHeight(entries[0].contentRect.height ?? 0);
        }
        
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };

    }, [containerRef]);

    return <div ref={containerRef} className={className}>
        <canvas
            className="w-full h-full"
            ref={canvasRef}
            width={width}
            height={height}
        />
    </div>
}