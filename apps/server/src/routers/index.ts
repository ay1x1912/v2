import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { workFlowRouter } from "./workFlow";

export const appRouter = router({
	workFlow:workFlowRouter,
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
});
export type AppRouter = typeof appRouter;
