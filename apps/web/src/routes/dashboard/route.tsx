import DashboardLayout from '@/components/dashboard-layout';

import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { ReactFlowProvider } from '@xyflow/react';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
		const session = await authClient.getSession();
		if (!session.data) {
			redirect({
				to: "/login",
				throw: true,
			})
		}
		return { session };
	},
})

function RouteComponent() {
  return (
    <ReactFlowProvider>
  <DashboardLayout/>

    </ReactFlowProvider>


  )
}
