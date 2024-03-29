import { getSelf } from "./auth-service";
import { db } from "./db";

export const followUser = async (id: string) => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({ where: { id } });

	if (!otherUser) {
		throw new Error("User not found");
	}

	if (otherUser.id === self.id) {
		throw new Error("You cannot follow yourself!");
	}

	const existingFollow = await db.follow.findFirst({
		where: { followerId: self.id, followingId: otherUser.id },
	});

	if (existingFollow) {
		throw new Error("You are already following this user!");
	}

	const follow = db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id,
		},
		include: { following: true, follower: true },
	});

	return follow;
};

export const isFollowingUser = async (id: string) => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({ where: { id } });

		if (!otherUser) {
			throw new Error("User not found");
		}

		if (otherUser.id === self.id) {
			return true;
		}

		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		});

		return !!existingFollow;
	} catch {
		return false;
	}
};

export const unfollowUser = async (id: string) => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({ where: { id } });

	if (!otherUser) {
		throw new Error("User not found!");
	}

	if (otherUser.id === self.id) {
		throw new Error("You can't unfollow yourself!");
	}

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});

	if (!existingFollow) {
		throw new Error("Not following");
	}

	const follow = await db.follow.delete({
		where: { id: existingFollow.id },
		include: { following: true },
	});

	return follow;
};

export const getFollowedUsers = async () => {
	try {
		const self = await getSelf();

		const followedUsers = db.follow.findMany({
			where: {
				followerId: self.id,
				following: { blocking: { none: { blockedId: self.id } } },
			},
			include: { following: true },
		});

		return followedUsers;
	} catch {
		return [];
	}
};
