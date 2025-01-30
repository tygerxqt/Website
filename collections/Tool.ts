import { CollectionConfig } from "payload";

export const Tool: CollectionConfig = {
	slug: "tool",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "dob",
			type: "date",
			required: false,
		},
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "summary",
			type: "textarea",
			required: false,
		},
		{
			name: "category",
			type: "select",
			options: [
				{
					label: "Desktop",
					value: "desktop"
				},
				{
					label: "Portable",
					value: "portable"
				},
				{
					label: "Console",
					value: "console"
				},
				{
					label: "Other",
					value: "other"
				}
			]
		},
		{
			name: "url",
			type: "text",
			required: false,
		}
	]
}