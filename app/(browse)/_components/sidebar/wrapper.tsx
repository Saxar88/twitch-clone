"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
	children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
	const [isClient, setIsClient] = useState(false);

	const { collapsed } = useSidebar((state) => state);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient)
		return (
			<aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		);

	return (
		<aside
			className={cn(
				"fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2d2e35] bg-background",
				collapsed && "w-[70px]"
			)}>
			{children}
		</aside>
	);
};
