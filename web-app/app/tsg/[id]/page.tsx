"use client";

import TransgenderDisplay from "@/components/visual/transgenderDisplay";
import { useParams } from "next/navigation";

const TsMappingPage = () => {
    const { id: idString } = useParams();

    const id = parseInt(idString as string);

    return <div className="w-full h-full">
        <TransgenderDisplay
            id={id}
            className="w-full h-full"
        />
    </div>
}

export default TsMappingPage;