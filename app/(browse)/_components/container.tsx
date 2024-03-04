"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface ContainerProps {
	children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
	const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
	const matches = useMediaQuery("(max-width: 1024px)");

	useEffect(() => {
		matches ? onCollapse() : onExpand();
	}, [matches, onCollapse, onExpand]);

	return (
		<div className={cn("ml-[70px] flex-1", !collapsed && "lg:ml-60")}>
			{children}
		</div>
	);
};
