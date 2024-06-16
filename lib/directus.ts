import { createDirectus, rest } from "@directus/sdk";

export interface Project {
	id: number;
	date_created: Date;
	date_updated: Date;
	name: string;
	summary: string;
	category: "personal" | "nord" | "lofu" | "contrib";
	featured: boolean;
	year: string;
	image: string;
	github_url: string;
	deploy_url: string | undefined;
}

export interface Image {
	id: number;
	status: "published" | "draft" | "archived";
	date_created: Date;
	date_updated: Date;
	name: string;
	tags: string[];
	shot_at: Date;
	camera: string;
	image: string;
}

export interface Tool {
	id: number;
	date_updated?: Date;
	dob?: Date;
	name: string;
	summary: string;
	category: string;
	url: string;
}

export interface Post {
	slug: string;
	status: "published" | "archived" | "draft";
	date_created: string;
	user_updated?: string;
	date_updated?: string;
	content: string;
	heading: string;
	hero: string;
	card_img: string;
	summary: string;
}

interface Schema {
	projects: Project[];
	gallery: Image[];
	gear: Tool[];
	posts: Post[];
}

export const cms = createDirectus<Schema>(
	process.env.NEXT_PUBLIC_CMS_URL as string
).with(rest());
