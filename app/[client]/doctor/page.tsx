// import { auth } from "@/auth";

export default async function Page() {
	// { searchParams }: SearchParamProps
	// const isAdmin = searchParams?.admin === "true";
	// Read user data from session - server side.
	// const session = await auth();

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					{/* <div>{session?.user?.["name"]}</div> */}
					<div className="text-14-regular mt-20 flex justify-between">
						<p className="justify-items-end text-dark-600 xl:text-left">
							© 2024 CarePulse
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
