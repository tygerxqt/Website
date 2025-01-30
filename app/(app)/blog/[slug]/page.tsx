import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "payload.config";
import { Media } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { jsxConverters } from "@/app/(app)/blog/[slug]/converters";

export async function generateStaticParams() {
	let payload = await getPayload({ config });
	const posts = await payload.find({
		collection: "posts",
		where: {
			status: {
				equals: "published",
			},
		},
	});

	return posts.docs.map((post) => {
		return {
			slug: post.slug,
		};
	});
}

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const slug = (await params).slug;
	let payload = await getPayload({ config });
	const post = await payload.find({
		collection: "posts",
		where: {
			status: {
				equals: "published",
			},
			slug: {
				equals: slug,
			},
		},
	});

	if (post.docs.length < 1) return;

	let metadata: Metadata = {
		title: post.docs[0].heading,
		description: post.docs[0].summary,
		publisher: "tygrdotdev",
		metadataBase: new URL(
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: "https://tygr.dev"
		),

		openGraph: {
			title: post.docs[0].heading,
			description: post.docs[0].summary,
			images: [
				{
					url:
						(post.docs[0].hero as Media).url ||
						"/assets/hero-placeholder.png",
					width: 800,
					height: 600,
				},
			],
			locale: "en_US",
			type: "article",
		},
	};

	return metadata;
};

async function formatDate(date: string) {
	await connection();
	let currentDate = new Date();
	if (!date.includes("T")) {
		date = `${date}T00:00:00`;
	}
	let targetDate = new Date(date);

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	let daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	let fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;

	let payload = await getPayload({ config });
	const post = await payload.find({
		collection: "posts",
		where: {
			status: {
				equals: "published",
			},
			slug: {
				equals: slug,
			},
		},
	});

	if (post.docs.length < 1) {
		return notFound();
	}

	return (
		<>
			<div className="p-2 py-4 mx-auto w-full max-w-[800px]">
				<div className="flex flex-col gap-2 pb-2">
					<h1 className="font-serif text-3xl font-bold sm:text-4xl">
						{post.docs[0].heading}
					</h1>
					<div className="flex flex-row items-center justify-between gap-4">
						<div className="flex flex-row items-center gap-2">
							<Image
								src="/profile.png"
								alt="T"
								aria-label="Author avatar"
								width={28}
								height={28}
								className="rounded-full"
							/>
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								tygrdotdev •{" "}
							</p>
							<time
								dateTime={post.docs[0].date_created}
								className="items-center text-sm text-neutral-500 dark:text-neutral-400"
							>
								{formatDate(post.docs[0].date_created)}
							</time>
						</div>
						<div>
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								{/* {readingTime()} read */}
							</p>
						</div>
					</div>
					<Image
						// Hero is required
						src={(post.docs[0].hero as Media).url!}
						alt="hero image"
						height={200}
						width={800}
						className="mt-4 border rounded-lg border-black/10 dark:border-white/10"
					/>
				</div>
				<article className="px-2">
					<RichText
						data={post.docs[0].content}
						converters={jsxConverters}
						className="prose prose-quoteless prose-neutral dark:prose-invert"
					/>
				</article>
			</div>
		</>
	);
}
