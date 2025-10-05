

import Page from "@/components/dashboard-layout";
import WorkFlowTable from "@/components/workflow-table";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	
});

function RouteComponent() {
	
 
	const privateData = useQuery(trpc.privateData.queryOptions());
	
   
	return (
		<>
		<WorkFlowTable/>
		
		</>
	)
}
