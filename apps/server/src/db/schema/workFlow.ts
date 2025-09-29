import { relations } from "drizzle-orm";
import { boolean, json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
}
export const workFlow=pgTable("workFlow",{
 id:text().primaryKey(),
 active:boolean().default(true),
 nodeData:json(),
 edgeData:json(),
 authorId:text().notNull(),
...timestamps
})
export const workFlowRealtion=relations(workFlow,({one})=>({
  author:one(user,{
    fields:[workFlow.authorId],
    references:[user.id]
  })
}))