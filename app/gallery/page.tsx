import Gallery from "@/components/gallery";
import { cms } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export default async function GalleryPage() {
	const raw = await cms.request(
		readItems("gallery", { sort: ["-date_created"] })
	);

	return (
		<>
			<main className="mx-auto max-w-[1960px] p-0 sm:p-2 md:p-4">
				<div className="w-full">
					<Gallery photos={raw} />
				</div>
			</main>
		</>
	);
}
