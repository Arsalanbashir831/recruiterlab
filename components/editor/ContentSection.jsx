"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, LoaderPinwheelIcon } from "lucide-react";
import SelectStyleButton from "../common/SelectStyleButton";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

// Map style IDs to user-friendly names
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
	// Individual state for each section's style
	const [selectedStyle, setSelectedStyle] = useState(section.style);

	// Handle word count display
	const wordCount = section?.content?.trim()
		? section.content.trim().split(/\s+/).length
		: 0;

	const styleLabel = styleLabels[selectedStyle] || "Custom Style";

	// Handle style selection change
	const handleStyleChange = (newStyle) => {
		setSelectedStyle(newStyle);
	};

	return (
		<div className='mb-6 space-y-2'>
			{/* Section Heading */}
			<div className='flex items-center justify-between'>
				<div>
					<div className='flex items-center gap-2'>
						<h3 className='font-medium capitalize'>{section.type}</h3>
						<p className='text-sm text-muted-foreground'>({wordCount} words)</p>
					</div>
					<p className='text-sm text-muted-foreground'>{styleLabel}</p>
				</div>

				{/* Style Selector & Edit/Save Button */}
				<div className='flex items-center gap-2'>
					<SelectStyleButton
						style={selectedStyle}
						onSelectStyle={handleStyleChange}
						styleOptions={styleLabels}
					/>

					{/* Edit Button */}
					<Tooltip>
						<TooltipTrigger asChild>
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
						</TooltipTrigger>
						<TooltipContent>Edit</TooltipContent>
					</Tooltip>

					{/* Regenerate Button */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={() => onRegenerate(section.id, `Make it ${selectedStyle}`)}
								variant='outline'
								size='sm'
								disabled={disabled}
								className='border-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out rounded-md px-3 py-2'>
								<LoaderPinwheelIcon className='h-4 w-4' />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Regenerate</TooltipContent>
					</Tooltip>
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
