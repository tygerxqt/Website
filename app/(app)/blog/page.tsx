import BlogCard from "@/components/blog/card";
import { getPayload } from "payload";
import { Suspense } from "react";
import config from "payload.config";

export default async function BlogPage() {
	const payload = await getPayload({ config });
	const posts = await payload.find({
		collection: "posts",
		sort: "-date",
	});

	return (
		<>
			<div className="flex flex-col gap-2 pt-2 w-full max-w-[800px]">
				<div className="pb-4">
					<h2 className="text-2xl font-bold sm:text-3xl font-display">
						Blog
					</h2>
					<p className="text-sm text-neutral-500 dark:text-neutral-400">
						All of my blog posts and tutorials. I <s>try to</s>{" "}
						write about web development, programming, and games.
					</p>
				</div>
				<Suspense fallback={<p>Loading...</p>}>
					{posts.docs.length === 0 && (
						<div className="flex flex-col items-center justify-center w-full py-8">
							<p className="text-neutral-500">
								There are no posts to show at the moment.
							</p>
						</div>
					)}
					<div className="grid grid-cols-1 gap-4 px-2 sm:px-0 sm:gap-2 sm:grid-cols-2">
						{posts.docs.map((post, idx) => (
							<BlogCard key={idx} post={post} />
						))}
					</div>
				</Suspense>
			</div>
		</>
	);
}
