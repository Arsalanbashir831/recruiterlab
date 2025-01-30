"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import SelectStyleButton from "../common/SelectStyleButton";

// Optional: Map style IDs to user-friendly names
const styleLabels = {
	insightful: "Insightful Take",
	numbered: "Numbered List",
	personal: "Personal Experience",
};

export function ContentSection({
	section,
	onRegenerate,
	onToggleEdit,
	onContentChange,
	onSave,
	disabled,
}) {
	// Handle edge cases for word counting
	const wordCount = section?.content?.trim()
		? section.content.trim().split(/\s+/).length
		: 0;

	const styleLabel = styleLabels[section.style] || "Custom Style";

	return (
		<div className='mb-6 space-y-2'>
			{/* Section Heading */}
			<div className='flex items-center justify-between'>
				<div>
					<div className='flex items-center gap-2'>
						<h3 className='font-medium capitalize'>{section.type}</h3>
						<p className='text-sm text-muted-foreground'>({wordCount} words)</p>
					</div>
					{/* Show the current style */}
					<p className='text-sm text-muted-foreground'>{styleLabel}</p>
				</div>

				{/* Style selector & Edit/Save button */}
				<div className='flex items-center gap-2'>
					<SelectStyleButton
						style={section.style}
						onSelectStyle={(newStyle) => onRegenerate(section.id, newStyle)}
					/>

					<Button
						variant='outline'
						size='sm'
						onClick={() =>
							section.isEditing ? onSave(section.id) : onToggleEdit(section.id)
						}
						disabled={disabled}
						className='border-2'>
						{section.isEditing ? "Save" : <Pencil className='h-4 w-4' />}
					</Button>
				</div>
			</div>

			{/* Textarea for content */}
			<div className='relative rounded-lg border bg-white p-4'>
				<Textarea
					value={section.content}
					onChange={(e) => onContentChange(section.id, e.target.value)}
					disabled={!section.isEditing || disabled}
					className='min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0'
					style={{
						height: `${Math.max(
							100,
							Math.ceil((section.content || "").length / 50) * 24
						)}px`,
					}}
				/>
			</div>
		</div>
	);
}
