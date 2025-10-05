import { protectedProcedure, router, wrapSuccess } from "@/lib/trpc";
import z from "zod"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { workFlow } from "@/db/schema/workFlow";
import { db } from "@/db";
import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
import { sortWorkFlow } from "@/lib/sort";
import { executeWorkFlow } from "@/lib/execute";
const workFlowSchema=createSelectSchema(workFlow)

const workFlowUpagteSchema=z.object({
 id:workFlowSchema.shape.id,
 nodeData:workFlowSchema.shape.nodeData,
 edgeData:workFlowSchema.shape.edgeData
})
export const workFlowRouter=router({


  create:protectedProcedure.mutation( async({ctx})=>{
    const userId=ctx.session.user.id
  try {
      const workFlows=await db.insert(workFlow).values({
        id:uuidv4(),
      authorId:userId,
      }).returning()
      console.log(workFlows[0].id)
      return wrapSuccess(workFlows[0])
  } catch (error) {
    console.log("error while creating workflow")
    throw new Error("Internal server Error");
  }
  })
,

 put:protectedProcedure.input(workFlowUpagteSchema).mutation( async({input,ctx})=>{
    try {
      const {id ,nodeData,edgeData}=input
      console.log(nodeData);
    const updatedWorkFlow=  await db.update(workFlow).set({
        nodeData,
        edgeData,
      }).where(eq(workFlow.id,id)).returning()
     return wrapSuccess(updatedWorkFlow[0])
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
    console.log(flow[0].nodeData);
    if(!flow) throw new Error("workFlow not found");
    return wrapSuccess(flow[0]);
  } catch (error) {
       console.log("error while geting workflow")

      throw new Error("Internal server Error");
  }
}),

execute:protectedProcedure.input(z.object({
   workFlowId:z.string()
})).mutation(async ({input}) => {
  try {
   const {workFlowId}=input;
   const flow=await db.select().from(workFlow).where(eq(workFlow.id,workFlowId));
   if(!flow) throw new Error("workFlow not found");
   const {nodeData,edgeData}=flow[0]

const sorted= sortWorkFlow(edgeData!);
executeWorkFlow(sorted,nodeData!)
return wrapSuccess(flow[0])

  } catch (error) {
      console.log("error while executin  workflow")

      throw new Error("Internal server Error");
  }
})






})