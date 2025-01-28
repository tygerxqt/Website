import { CollectionConfig } from "payload";

export const Photos: CollectionConfig = {
	slug: "photos",
	access: {
		read: () => true,
	},
	fields: [
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
			name: "camera",
			type: "text",
			required: true,
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		}
	]
}