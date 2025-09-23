"use client";

import SimpleColorDisplay from "@/components/visual/simpleColorDisplay";
import { useParams } from "next/navigation";

const SimpleDisplayPage = () => {
    const { id: idString } = useParams();

    const id = parseInt(idString as string);

    return <div className="w-full h-full">
        <SimpleColorDisplay
            id={id}
            className="w-full h-full"
        />
    </div>
}

export default SimpleDisplayPage;