"use client";

import SimpleColorDisplay from "@/components/visual/simpleColorDisplay";
import { cn, sequence } from "@/lib/utils";
import Link from "next/link";

const SimpleDisplayOverviewPage = () => {
    return <div className={cn(
        "w-full h-full",
        "grid grid-cols-4 grid-rows-4",
        "gap-0.5"
    )}>
        {sequence({ start: 1,count: 16 }).map((i) => (
            <div key={`SCD-${i.toString()}`} className="bg-blue-400">
                <SimpleColorDisplay
                    id={i}
                    className="w-full h-full"
                >
                    <div className={cn(
                        "text-white bg-black/40 p-3 rounded-md",
                        "flex flex-col items-center justify-center",
                        "gap-2"
                    )}>
                        <div className="text-xl font-bold">{i.toString()}</div>
                        <Link
                            href={`/simple-display/${i}`} target="_blank" rel="noopener noreferrer"
                            className={cn(
                                "text-sm italic",
                                "hover:underline"
                            )}
                        >
                            Preview display
                        </Link>
                    </div>
                </SimpleColorDisplay>
            </div>
        ))}
    </div>
}

export default SimpleDisplayOverviewPage;