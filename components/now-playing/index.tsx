import Link from "next/link";
import Icons from "../icons";
import { Button } from "../ui/button";
import { getNowPlaying } from "./actions"

export default async function NowPlaying() {
	const data = await getNowPlaying();

	return (
		<div className="flex flex-row items-center gap-1 justify-center w-full py-4">
			<Icons.Spotify className="w-6 h-6 mr-2" />
			<span className="text-neutral-500">
				{data.is_playing ? "Now Playing:" : "Spotify - Not Playing"}
			</span>
			{data.is_playing && (
				<Link href={data.item!.external_urls.spotify} target="_blank">
					<Button variant="link" className="px-0">
						{data.item!.name} - {data.item!.artists.map((artist) => artist.name).join(", ")}
					</Button>
				</Link>
			)}
		</div>
	)
}