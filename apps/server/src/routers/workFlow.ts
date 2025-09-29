import { protectedProcedure, router, wrapSuccess } from "@/lib/trpc";
import z from "zod"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { workFlow } from "@/db/schema/workFlow";
import { db } from "@/db";
import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
const workFlowSchema=createSelectSchema(workFlow)


export const workFlowRouter=router({


  create:protectedProcedure.mutation( async({ctx})=>{
    const userId=ctx.session.user.id
  try {
      const workFlows=await db.insert(workFlow).values({
        id:uuidv4(),
      authorId:userId,
      }).returning()
      return wrapSuccess(workFlow)
  } catch (error) {
    console.log("error while creating workflow")
    throw new Error("Internal server Error");
  }
  })
,

 put:protectedProcedure.input(workFlowSchema).mutation( async({input,ctx})=>{
    try {
      const {id ,nodeData,edgeData}=input
    const updatedWorkFlow=  await db.update(workFlow).set({
        nodeData,
        edgeData,
      }).where(eq(workFlow.id,id)).returning()
     return wrapSuccess(updatedWorkFlow)
    } catch (error) {
    console.log("error while updating workflow")

      throw new Error("Internal server Error");
    }
 }) 
,


get:protectedProcedure.query(async({ctx})=>{
  try {
    const userId=ctx.session.user.id
    const allWorkFlows=await db.select().from(workFlow).where(eq(workFlow.authorId,userId));
    return wrapSuccess(allWorkFlows);
  } catch (error) {
     console.log("error while geting all workflows")

      throw new Error("Internal server Error");
  }
}),
getById:protectedProcedure.input(z.object({
  workFlowId:z.string()
})).query(async ({ctx,input}) => {
  try {
    const {workFlowId}=input;
    const flow=await db.select().from(workFlow).where(eq(workFlow.id,workFlowId));
    if(!flow) throw new Error("workFlow not found");
    return wrapSuccess(flow);
  } catch (error) {
       console.log("error while geting workflow")

      throw new Error("Internal server Error");
  }
})
})