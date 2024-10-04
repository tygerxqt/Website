import { TopAlbumData } from "./top-album";

export async function getTopAlbums(): Promise<TopAlbumData | null> {
	const data = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${process.env.LASTFM_USER}&api_key=${process.env.LASTFM_API_KEY}&format=json`
	)
		.then(async (res) => {
			const json = await res.json();
			return json;
		})
		.catch((err) => {
			console.error(err);
			return null;
		});

	return data;
}
