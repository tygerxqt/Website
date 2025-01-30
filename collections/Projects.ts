import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "summary",
			type: "textarea",
			required: true,
		},
		{
			name: "featured",
			type: "checkbox",
			required: true,
			defaultValue: false
		},
		{
			name: "category",
			type: "select",
			defaultValue: "personal",
			options: [
				{ label: "Personal", value: "personal" },
				{ label: "Nord Studio", value: "nord" },
				{ label: "Contributor", value: "contrib" },
			],
		},
		{
			name: "year",
			type: "number",
			required: true,
			defaultValue: new Date().getFullYear(),
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "deploy_url",
			type: "text",
			required: false,
		},
		{
			name: "github_url",
			type: "text",
			required: false,
		}
	],
}