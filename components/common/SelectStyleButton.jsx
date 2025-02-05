"use client";

import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function SelectStyleButton({ style, onSelectStyle, styleOptions }) {
	return (
		<Select value={style} onValueChange={onSelectStyle}>
			<SelectTrigger className='w-[200px]'>
				<SelectValue>{styleOptions?.[style] || "Select Style"}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{Object.entries(styleOptions || {}).map(([value, label]) => (
					<SelectItem key={value} value={value}>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
