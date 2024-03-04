import Link from "next/link";
import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Actions = async () => {
	const user = await currentUser();

	return (
		<div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
			{!user && (
				<SignInButton>
					<Button size="sm" variant="primary">
						Log in
					</Button>
				</SignInButton>
			)}
			{!!user && (
				<div className="flex items-center gap-x-4">
					<Button
						size="sm"
						variant="ghost"
						className="test-muted-foreground hover:test-primary"
						asChild>
						<Link href={`/u/${user.username}`}>
							<Clapperboard className="h-5 w-5 lg:mr-2" />
							<span className="hidden lg:block">Dashboard</span>
						</Link>
					</Button>
					<UserButton afterSignOutUrl="/" />
				</div>
			)}
		</div>
	);
};
