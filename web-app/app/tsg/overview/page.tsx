"use client";

import TransgenderDisplay from "@/components/visual/transgenderDisplay";
import { cn, sequence } from "@/lib/utils";
import Link from "next/link";

const TsgOverviewPage = () => {
    return <div className={cn(
        "w-full h-full",
        "grid grid-cols-4 grid-rows-4",
        "gap-0.5"
    )}>
        {sequence({ start: 1,count: 16 }).map((i) => (
            <div key={`SCD-${i.toString()}`} className="bg-blue-400">
                <TransgenderDisplay
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
                            href={`/tsg/${i}`} target="_blank" rel="noopener noreferrer"
                            className={cn(
                                "text-sm italic",
                                "hover:underline"
                            )}
                        >
                            Preview display
                        </Link>
                    </div>
                </TransgenderDisplay>
            </div>
        ))}
    </div>
}

export default TsgOverviewPage;