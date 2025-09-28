"use client";

import { useChataigneVariableRef } from "@/lib/hooks/useChataigneVariable";
import { and, cn, or } from "@/lib/utils";
import { useCallback } from "react";
import { DrawingBoard, DrawProps } from "../ui/drawing-board";

export type TransgenderDisplayProps = {
    id: number;
    className?: string;
    children?: React.ReactNode;
}

const TransgenderDisplay = (props: TransgenderDisplayProps) => {
    const {
        className,
        id,
        children,
    } = props;

    const opacityPath = `/states/transgender/processors/outputValues/lists/outputValues/#${id}`;
    const colorPath = `/states/transgender/processors/outputValues/lists/colors/#${id}`;
    const strobeAmplitudePath = `/states/transgender/processors/outputValues/lists/strobeAmplitudes/#${id}`;
    const strobeSpeedPath = `/states/transgender/processors/outputValues/lists/strobeSpeeds/#${id}`;
    const bpmPath = "/customVariables/transgender/variables/bpm/bpm"; 

    const [opacityRef, opacityLoading, opacityError] = useChataigneVariableRef<"Float">(opacityPath);
    const [colorRef, colorLoading, colorError] = useChataigneVariableRef<"Color">(colorPath);
    const [strobeAmplitudeRef, strobeAmplitudeLoading, strobeAmplitudeError] = useChataigneVariableRef<"Float">(strobeAmplitudePath);
    const [strobeSpeedRef, strobeSpeedLoading, strobeSpeedError] = useChataigneVariableRef<"Float">(strobeSpeedPath);
    const [bpmRef, bpmLoading, bpmError] = useChataigneVariableRef<"Float">(bpmPath);

    const draw = useCallback((d: DrawProps) => {
        const {
            context,
            width,
            height,
            time,
            deltaTime,
        } = d;
        
        context.clearRect(0, 0, width, height);

        if (or(
            opacityRef.current === null,
            colorRef.current === null,
            strobeAmplitudeRef.current === null,
            strobeSpeedRef.current === null,
            bpmRef.current === null,
        )) return;

        const { r, g, b } = colorRef.current.value;
        const a = opacityRef.current.value;
        const strobeAmplitude = strobeAmplitudeRef.current.value;
        const strobeSpeed = strobeSpeedRef.current.value;
        const bpm = bpmRef.current.value;

        context.fillStyle = `black`;
        context.fillRect(0, 0, width, height);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        context.fillRect(0, 0, width, height);
        
    }, []);

    const isLoading = or(
        opacityLoading,
        colorLoading,
        strobeAmplitudeLoading,
        strobeSpeedLoading,
        bpmLoading,
        opacityRef === null,
        colorRef === null,
        strobeAmplitudeRef === null,
        strobeSpeedRef === null,
        bpmRef === null,
    );


    if (isLoading) {
        return <div className={cn(
            "bg-white text-black",
            "flex items-center justify-center",
            className,
        )}>
            <div>Loading...</div>
        </div>
    }

    const hasError = or(
        opacityError !== null,
        colorError !== null,
        strobeAmplitudeError !== null,
        strobeSpeedError !== null,
        bpmError !== null
    );

    if (hasError) {
        return <div className={cn(
            "bg-white text-black",
            "flex items-center justify-center",
            className,
        )}>
            {opacityError && <div>{opacityError.message}</div>}
            {colorError && <div>{colorError.message}</div>}
            {strobeAmplitudeError && <div>{strobeAmplitudeError.message}</div>}
            {strobeSpeedError && <div>{strobeSpeedError.message}</div>}
            {bpmError && <div>{bpmError.message}</div>}
        </div>
    }    

    return <div className={cn(
        "relative",
        className,
    )}>
        <DrawingBoard
            className={cn(
                "w-full h-full",
                "absolute inset-0",
            )}
            draw={draw}
        />
        {children && <div className={cn(
            "w-full h-full",
            "absolute inset-0",
            "flex items-center justify-center",
        )}>
            {children}
        </div>}
    </div>
}

export default TransgenderDisplay;