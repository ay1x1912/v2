

import Page from "@/components/dashboard";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await authClient.getSession();
		if (!session.data) {
			redirect({
				to: "/login",
				throw: true,
			});
		}
		return { session };
	},
});

function RouteComponent() {
	const { session } = Route.useRouteContext();
 
	const privateData = useQuery(trpc.privateData.queryOptions());
	
	const user={
		name:session.data?.user.name ?? "",
		email:session.data?.user.email ?? "",
		avatar:session.data?.user.name ?? "",

	}
   
	return (
		<Page user={user}/>
	);
}
