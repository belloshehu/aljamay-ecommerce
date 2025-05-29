import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isActivePath(path: string, currentPath: string) {
	return path.toLowerCase() === currentPath.toLowerCase();
}

export function getBaseUrl() {
	return process.env.NODE_ENV !== "production"
		? process.env.NEXT_PUBLIC_BASE_URL_DEV
		: process.env.NEXT_PUBLIC_BASE_URL_PROD;
}
