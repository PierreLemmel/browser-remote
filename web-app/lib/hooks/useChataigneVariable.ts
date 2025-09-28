import { useChataigneContext } from "@/contexts/ChataigneContext";
import { NodeType } from "react-oscquery";
import { useChataigne, useChataigneRef } from "react-chataigne";

export function useChataigneVariable<Type extends NodeType>(path: string) {
    const { host, port } = useChataigneContext();

    const result = useChataigne<Type>(path, { host, port });

    return result;
};

export function useChataigneVariableRef<Type extends NodeType>(path: string) {
    const { host, port } = useChataigneContext();

    const result = useChataigneRef<Type>(path, { host, port });

    return result;
}