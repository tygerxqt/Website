import { getTopAlbums } from "@/lib/lastfm";
import { AlbumCard } from "./card";
import { truncate } from "@/lib/utils";

export default async function MusicPage() {
	const albumData = await getTopAlbums();

	return (
		<>
			<div className="flex flex-col gap-2 pt-2 w-full max-w-[800px]">
				<div className="pb-4">
					<h2 className="text-2xl font-bold sm:text-3xl font-display">Music</h2>
					<p className="text-sm">A digestable list of my top albums.</p>
				</div>
				<div className="flex flex-col gap-4 items-center pb-4">
					{albumData ? (
						<>
							<div className="grid gap-4 grid-cols-1 xs:grid-cols-2	 sm:grid-cols-2 md:grid-cols-3 grid-rows-subgrid">
								{albumData?.topalbums.album.slice(0, 48).map((album) => {
									return (
										<>
											<AlbumCard
												key={album.name}
												artist={album.artist.name}
												name={truncate(album.name, 25)}
												coverImage={album.image[3]["#text"]}
												href={album.url}
											/>
										</>
									);
								})}
							</div>
						</>
					) : (
						<>
							<p>Failed to fetch top albums.</p>
						</>
					)}
				</div>
			</div>
		</>
	);
}
