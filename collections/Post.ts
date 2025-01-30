import { CollectionConfig } from "payload";

export const Post: CollectionConfig = {
	slug: "posts",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "status",
			type: "select",
			options: [
				{
					label: "Draft",
					value: "draft",
				},
				{
					label: "Published",
					value: "published",
				},
			],
			defaultValue: "draft",
		},
		{
			name: "date_created",
			type: "date",
			required: true,
			defaultValue: () => new Date(),
		},
		{
			name: "date_updated",
			type: "date",
			required: true,
			defaultValue: () => new Date(),
		},
		{
			name: "heading",
			type: "text",
			required: true,
		},
		{
			name: "summary",
			type: "textarea",
			required: true,
		},
		{
			name: "hero",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "card_img",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "content",
			type: "richText",
			required: true,
		}
	]
}