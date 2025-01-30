import Gallery from "@/components/gallery";
import { getPayload } from "payload";
import config from "payload.config";

export default async function GalleryPage() {
	const payload = await getPayload({ config });
	const photos = await payload.find({
		collection: "photos",
		limit: 100,
		// sort: ["-createdAt"],
	});

	return (
		<>
			<main className="mx-auto max-w-[1960px] p-0 sm:p-2 md:p-4">
				<div className="w-full">
					<Gallery photos={photos.docs} />
				</div>
			</main>
		</>
	);
}
