import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const Actions = () => {
	return (
		<div className="flex items-center justify-end gap-x-2">
			<Button
				size="sm"
				variant="ghost"
				asChild
				className="text-muted-foreground hover:text-primary">
				<Link href="/">
					<LogOut className="mr-2 h-5 w-5" />
					Exit
				</Link>
			</Button>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};
