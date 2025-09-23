import { useChataigneVariable } from "@/lib/hooks/useChataigneVariable";
import { cn } from "@/lib/utils";


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

    const [opacityValue, opacityLoading, opacityError] = useChataigneVariable<"Float">(opacityPath);
    const [colorValue, colorLoading, colorError] = useChataigneVariable<"Color">(colorPath);

    if (opacityLoading || colorLoading || (opacityValue === null) || (colorValue === null)) {
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

    const { value: opacity } = opacityValue;
    const { value: { r, g, b } } = colorValue;

    return <div className={cn(
        "relative",
        "bg-black",
        className,
    )}>
        <div
            className={cn(
                "w-full h-full",
                "absolute inset-0",
            )}
            style={{ backgroundColor: `rgb(${r}, ${g}, ${b})`, opacity }}
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