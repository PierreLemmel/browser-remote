import { cn } from "@/lib/utils";
import Link from "next/link";

const Home = () => {

	return <div className={cn(
		"w-full h-full bg-white",
		"flex flex-col items-center justify-center",
		"gap-3"
	)}>
		<div className="text-4xl font-bold">Browser Remote</div>
		<div>
			<Link href="/tsg/overview" className="text-gray-500 hover:underline">Transgender Mapping Overview</Link>
		</div>
	</div>
}

export default Home;