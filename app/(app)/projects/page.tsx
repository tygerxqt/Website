import ProjectCard from "@/app/(app)/projects/card";
import { getPayload } from "payload";
import config from "@payload-config";
import { Media } from "@/payload-types";

export default async function ProjectsPage() {
	const payload = await getPayload({ config });
	const projects = await payload.find({
		collection: "projects",
		limit: 50,
	});

	return (
		<>
			<div className="flex flex-col gap-2 pt-2 w-full max-w-[800px]">
				<div className="pb-4">
					<h2 className="text-2xl font-bold sm:text-3xl font-display">
						Projects
					</h2>
					<p className="text-sm text-neutral-500 dark:text-neutral-400">
						I&apos;ve made a lot of things over the years,
						here&apos;s a few of them.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-3 px-2 md:px-0">
					{projects.docs.map((p, i: number) => (
						<ProjectCard
							key={i}
							name={p.name}
							summary={p.summary}
							year={p.year}
							img={p.image as Media}
							github_url={p.github_url}
							deploy_url={p.deploy_url}
						/>
					))}
				</div>
			</div>
		</>
	);
}
