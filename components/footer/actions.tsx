export interface Status {
	timestamp?: number;
	context?: Context;
	progress_ms?: number;
	item?: Item;
	currently_playing_type?: string;
	actions?: Actions;
	is_playing: boolean;
}

export interface Context {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Item {
	album: Album;
	artists: Artist2[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Artist2 {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalIds {
	isrc: string;
}

export interface Actions {
	disallows: Disallows;
}

export interface Disallows {
	resuming: boolean;
}

export async function getAccessToken() {
	const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
	const client_id = process.env.SPOTIFY_CLIENT_ID;
	const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

	if (typeof refresh_token !== "string") {
		throw new Error("No refresh token found");
	}

	if (typeof client_id !== "string") {
		throw new Error("No client id found");
	}

	if (typeof client_secret !== "string") {
		throw new Error("No client secret found");
	}

	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	return res.json();
}

export async function getNowPlaying() {
	const { access_token } = await getAccessToken();

	const res = await fetch(
		"https://api.spotify.com/v1/me/player/currently-playing",
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-store"
		}
	);

	if (res.status === 204 || res.status > 400) {
		const status: Status = { is_playing: false };
		return status;
	}

	const status: Status = await res.json();

	return status;
}
