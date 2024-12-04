import Link from "next/link";
import Icons from "../icons";
import { Button } from "../ui/button";
import { getNowPlaying } from "./actions";

export default async function NowPlaying() {
	const data = await getNowPlaying();

	return (
		<div className="flex flex-row items-center gap-1 justify-center w-full py-4">
			{data.is_playing ? (
				<>
					<div className="flex flex-wrap gap-1 items-center justify-center">
						<div className="flex flex-row gap-1 items-center">
							<Icons.Spotify className="w-6 h-6 mr-2" />
							<span className="text-neutral-500">
								Listening to:
							</span>
						</div>

					<Link href={data.item!.external_urls.spotify} target="_blank">
						<Button variant="link" className="px-0">
								<span className="overflow-ellipsis line-clamp-1 w-fit">
							{data.item!.name} -{" "}
							{data.item!.artists.map((artist) => artist.name).join(", ")}
								</span>
						</Button>
					</Link>
					</div>
				</>
			) : (
				<Link href="https://open.spotify.com/user/z4is4ny666qn1njee0k6g77o2?si=275c31679b264854" target="_blank">
						<Button variant="link" className="px-0 flex flex-row">
							<Icons.Spotify className="w-6 h-6 mr-2" />
						Spotify - Nothing Playing
					</Button>
				</Link>
			)}
		</div>
	);
}
