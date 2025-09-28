import { useChataigneVariableRef } from "@/lib/hooks/useChataigneVariable";
import { cn, or } from "@/lib/utils";
import { useEffect, useRef } from "react";


export type SimpleColorDisplayProps = {
    id: number;
    className?: string;
    children?: React.ReactNode;
}

const SimpleColorDisplay = (props: SimpleColorDisplayProps) => {
    
    const {
        id,
        className,
        children,
    } = props;
    
    const opacityPath = `/customVariables/group/variables/value${id}/value${id}`;
    const colorPath = `/customVariables/group/variables/color${id}/color${id}`;

    const [opacityRef, opacityLoading, opacityError] = useChataigneVariableRef<"Float">(opacityPath);
    const [colorRef, colorLoading, colorError] = useChataigneVariableRef<"Color">(colorPath);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
		
		let animationFrameId: number;

		const draw = () => {
			render();

			animationFrameId = requestAnimationFrame(draw);
		};

		const render = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

            if (opacityRef.current === null || colorRef.current === null) return;

            const { r, g, b } = colorRef.current.value;
			const a = opacityRef.current.value;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		draw();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [canvasRef, opacityRef, colorRef]);

    const isLoading = or(
        opacityLoading,
        colorLoading,
        (opacityRef === null),
        (opacityRef.current === null),
        (colorRef === null),
        (colorRef.current === null),
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

    if (opacityError || colorError) {
        return <div className={cn(
            "bg-white text-black",
            "flex items-center justify-center",
            className,
        )}>
            {opacityError && <div>{opacityError.message}</div>}
            {colorError && <div>{colorError.message}</div>}
        </div>
    }

    return <div
        ref={containerRef}
        className={cn(
            "relative",
            "bg-black",
            className,
        )}
    >
        <canvas
            ref={canvasRef}
            className={cn(
                "w-full h-full",
                "absolute inset-0",
            )}
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

export default SimpleColorDisplay;