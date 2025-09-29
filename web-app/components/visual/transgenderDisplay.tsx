"use client";

import { useChataigneVariableRef } from "@/lib/hooks/useChataigneVariable";
import { and, cn, or } from "@/lib/utils";
import { useCallback, useRef } from "react";
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
    const strobeAmplitudePath = `/states/transgender/processors/outputValues/lists/strobeOutputAmplitudes/#${id}`;
    const strobeSpeedPath = `/states/transgender/processors/outputValues/lists/strobeSpeeds/#${id}`;
    const bpmPath = "/customVariables/transgender/variables/bpm/bpm"; 

    const [opacityRef, opacityLoading, opacityError] = useChataigneVariableRef<"Float">(opacityPath);
    const [colorRef, colorLoading, colorError] = useChataigneVariableRef<"Color">(colorPath);
    const [strobeAmplitudeRef, strobeAmplitudeLoading, strobeAmplitudeError] = useChataigneVariableRef<"Float">(strobeAmplitudePath);
    const [strobeSpeedRef, strobeSpeedLoading, strobeSpeedError] = useChataigneVariableRef<"Float">(strobeSpeedPath);
    const [bpmRef, bpmLoading, bpmError] = useChataigneVariableRef<"Float">(bpmPath);

    const strobeRef = useRef<{ val: number, goUp: boolean }>({ val: 0, goUp: false });
    
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

        let { val: strobeVal, goUp: strobeGoUp } = strobeRef.current;

        const dStrobe = (deltaTime / 1000) * (2 * strobeSpeed * bpm) / 60;

        if (strobeGoUp) {
            strobeVal += dStrobe;
            if (strobeVal > 1) {
                strobeVal = 2 - strobeVal;
                strobeGoUp = false;
            }
        } else {
            strobeVal -= dStrobe;
            if (strobeVal < 0) {
                strobeVal = -strobeVal;
                strobeGoUp = true;
            }
        }

        strobeRef.current = { val: strobeVal, goUp: strobeGoUp };

        const resultOpacity = a * (1 - (strobeVal * strobeAmplitude));
        console.log({ deltaTime, dStrobe, strobeVal, resultOpacity });
        
        context.fillStyle = `black`;
        context.fillRect(0, 0, width, height);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${resultOpacity})`;
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