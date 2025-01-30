"use client";

import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function SelectStyleButton({ style, onSelectStyle }) {
	return (
		<Select value={style} onValueChange={onSelectStyle}>
			<SelectTrigger className='w-[200px]'>
				<SelectValue placeholder='Select Style' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='insightful'>Insightful Take</SelectItem>
				<SelectItem value='numbered'>Numbered List</SelectItem>
				<SelectItem value='personal'>Personal Experience</SelectItem>
			</SelectContent>
		</Select>
	);
}
