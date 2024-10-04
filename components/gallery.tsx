"use client";

import { Image as ImageType } from "@/lib/directus";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";
import Icons from "./icons";
import { BlurFade } from "./ui/blur-fade";

export default function Gallery({
	photos,
	breakPoints,
}: {
	photos: ImageType[];
	breakPoints?:
		| {
				[key: number]: number;
		  }
		| undefined;
}) {
	return (
		<>
			<ResponsiveMasonry
				className="w-full py-4"
				columnsCountBreakPoints={breakPoints ?? { 350: 1, 750: 2, 900: 3 }}
			>
				<Masonry gutter="1.5rem">
					{photos.map((img, idx) => {
						return (
							<BlurFade key={img.id} delay={0.25 + idx * 0.05} inView>
								<div className="flex flex-col p-0 m-0 group">
									<Image
										src={
											process.env.NEXT_PUBLIC_CMS_URL + "/assets/" + img.image
										}
										alt={img.name}
										width={1080}
										height={1080}
										quality={25}
										className="object-cover object-center w-full h-full border rounded-lg border-black/10 dark:border-white/10"
									/>
									<div className="w-full backdrop-blur">
										<div className="absolute bottom-0 items-center w-full p-4 text-white transition-opacity border-t-2 rounded-b-lg opacity-0 group-hover:opacity-100 border-black/10 dark:border-white/10 bg-black/70">
											<div className="flex flex-row items-center gap-2">
												<Icons.Camera className="w-4 h-4 font-medium" />
												<p className="font-medium text-md">{img.camera}</p>
											</div>
										</div>
									</div>
								</div>
							</BlurFade>
						);
					})}
				</Masonry>
			</ResponsiveMasonry>
		</>
	);
}
