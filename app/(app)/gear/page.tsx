import Icons from "@/components/icons";
import { Gear } from "@/payload-types";
import Link from "next/link";
import { getPayload } from "payload";
import config from "payload.config";

function GearItem({ tool }: { tool: Gear }) {
	return (
		<>
			<div className="flex flex-col justify-between w-full group">
				<Link href={tool.url ?? ""} passHref target="_blank">
					<div className="flex flex-col gap-0">
						<div className="flex flex-row items-center w-full gap-2">
							<h2 className="text-lg font-medium group-hover:underline">
								{tool.name}
							</h2>
							<Icons.External className="w-4 h-4 text-neutral-600 dark:text-neutral-500" />
						</div>
						<p className="text-sm dark:text-neutral-400 text-neutral-500">
							{tool.summary}
						</p>
					</div>
				</Link>
			</div>
		</>
	);
}

export default async function GearPage() {
	const payload = await getPayload({ config });
	const rawGear = await payload.find({
		collection: "gear",
	});

	function categoriseItems(items: any, field: any) {
		const categories: any = {};

		rawGear.docs.forEach((item) => {
			const value = item["category"] as
				| "desktop"
				| "portable"
				| "console"
				| "other";

			if (!categories[value]) {
				categories[value] = [];
			}

			categories[value].push(item);
		});

		return categories;
	}

	const tools: { [key: string]: Array<Gear> } = categoriseItems(
		rawGear,
		"category"
	);

	return (
		<>
			<div className="flex flex-col gap-2 pt-2 w-full max-w-[800px]">
				<div className="pb-4">
					<h2 className="text-2xl font-bold sm:text-3xl font-display">
						My Gear
					</h2>
					<p className="text-sm text-neutral-500 dark:text-neutral-400">
						The entire list of the gear I use for productivity,
						development, and entertainment.
					</p>
				</div>
				<div className="flex flex-col gap-8 pb-4">
					{Object.keys(tools).map((category) => (
						<div key={category} className="flex flex-col gap-3">
							<div className="flex flex-col gap-2">
								<h1 className="text-xl font-bold">
									{category[0].toUpperCase() +
										category.slice(1, category.length)}
								</h1>
								<hr className="border border-black/10 dark:border-white/10" />
							</div>
							<div className="flex flex-col items-center w-full gap-4">
								{tools[category].map((tool) => (
									<GearItem key={tool.id} tool={tool} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
