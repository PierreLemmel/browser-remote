import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export type SequenceOptions = {
	count: number;
	start?: number;
}

export function sequence(options: SequenceOptions) {
	const { count, start = 0 } = options;
	return Array.from({ length: count }, (_, i) => i + start);
}

export function or(...conditions: boolean[]) {
	return conditions.some(condition => condition);
}

export function and(...conditions: boolean[]) {
	return conditions.every(condition => condition);
}