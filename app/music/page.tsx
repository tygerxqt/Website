import { getTopAlbums } from "@/lib/lastfm";
import Image from "next/image";

export default async function MusicPage() {
	const albumData = await getTopAlbums();

	return (
		<>
			<div className="flex flex-col gap-2 pt-2 w-full max-w-[800px]">
				<div className="pb-4">
					<h2 className="text-2xl font-bold sm:text-3xl font-display">Music</h2>
					<p className="text-sm">A digestable list of my top albums.</p>
				</div>
				<div className="flex flex-col gap-4 items-start pb-4">
					{typeof albumData === "undefined" || albumData === null ? (
						<>
							<p>Failed to fetch top albums.</p>
						</>
					) : (
						<>
							<div className="grid grid-cols-3 grid-rows-2 gap-2">
								{albumData?.topalbums.album.slice(0, 48).map((album) => {
									return (
										<>
											<div className="w-full border group		 border-black/10 dark:border-white/10 flex flex-col p-0 m-0 rounded-lg text-start transition-all">
												<Image
													width={1200}
													height={1200}
													src={album.image[3]["#text"]}
													alt={album.name}
													className="rounded-lg group-hover:zoom-in-105"
												/>
											</div>
										</>
									);
								})}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
