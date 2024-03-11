import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
	const self = await getSelf();
	const stream = await getStreamByUserId(self.id);

	if (!stream) throw new Error("Stream not found");

	return (
		<div className="p-6">
			<div>
				<h1 className="mb-4 text-2xl font-bold">Chat settings</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					field="isChatEnabled"
					label="Enable chat"
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					field="isChatDelayed"
					label="Delay chat"
					value={stream.isChatDelayed}
				/>
				<ToggleCard
					field="isChatFollowersOnly"
					label="Enable chat for followers only"
					value={stream.isChatFollowersOnly}
				/>
			</div>
		</div>
	);
};

export default ChatPage;
