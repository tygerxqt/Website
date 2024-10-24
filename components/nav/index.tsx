import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/toggle";
import Link from "next/link";
import Icons from "@/components/icons";
import MobileNav from "./mobile";

export default function NavBar() {
	return (
		<>
			<nav className="flex flex-col items-center justify-center w-full">
				<div className="flex flex-row items-center justify-between max-w-[800px] w-full gap-4 px-2 py-4">
					<Link href="/" passHref>
						<div>
							<Image
								width={32}
								height={32}
								src="/logos/dark.jpg"
								alt="logo"
								className="hidden dark:block"
							/>
							<Image
								width={32}
								height={32}
								src="/logos/light.jpg"
								alt="logo"
								className="dark:hidden"
							/>
						</div>
					</Link>

					<div className="hidden sm:flex">
						<Link href="/">
							<Button variant="link">About</Button>
						</Link>
						<Link href="/projects">
							<Button variant="link">Projects</Button>
						</Link>
						<Link href="/blog">
							<Button variant="link">Blog</Button>
						</Link>
						<Link href="/gallery">
							<Button variant="link">Gallery</Button>
						</Link>
						<Link href="/gear">
							<Button variant="link">Gear</Button>
						</Link>
						<Link href="/music">
							<Button variant="link">Music</Button>
						</Link>
					</div>

					<div>
						<ThemeToggle />
						<MobileNav>
							<Button
								variant="ghost"
								className="text-black sm:hidden dark:text-white"
								size="icon"
							>
								<Icons.Menu />
							</Button>
						</MobileNav>
					</div>
				</div>
			</nav>
		</>
	);
}
