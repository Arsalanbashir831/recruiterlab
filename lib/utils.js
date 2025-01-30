import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const formatContent = (post) => {
	const sections = Object.values(post?.sections);
	return sections.map((section) => section?.content).join("\n\n");
};
