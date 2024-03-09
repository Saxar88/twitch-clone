import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
	const following = await getFollowedUsers();
	const recommended = await getRecommended();

	return (
		<Wrapper>
			<Toggle />
			<div className="space-y-4 pt-4 lg:pt-0">
				<Following data={following} />
				<Recommended data={recommended} />
			</div>
		</Wrapper>
	);
};

export const SidebarSkeleton = () => {
	return (
		<aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
			<ToggleSkeleton />
			<FollowingSkeleton />
			<RecommendedSkeleton />
		</aside>
	);
};
