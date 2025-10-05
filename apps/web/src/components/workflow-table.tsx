import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

// const items = [
//   {
//     id: "1",
//     name: "Alex Thompson",
//     email: "alex.t@company.com",
//     location: "San Francisco, US",
//     status: "Active",
//     balance: "$1,250.00",
//   },
//   {
//     id: "2",
//     name: "Sarah Chen",
//     email: "sarah.c@company.com",
//     location: "Singapore",
//     status: "Active",
//     balance: "$600.00",
//   },
//   {
//     id: "3",
//     name: "James Wilson",
//     email: "j.wilson@company.com",
//     location: "London, UK",
//     status: "Inactive",
//     balance: "$650.00",
//   },
//   {
//     id: "4",
//     name: "Maria Garcia",
//     email: "m.garcia@company.com",
//     location: "Madrid, Spain",
//     status: "Active",
//     balance: "$0.00",
//   },
//   {
//     id: "5",
//     name: "David Kim",
//     email: "d.kim@company.com",
//     location: "Seoul, KR",
//     status: "Active",
//     balance: "-$1,000.00",
//   },
// ]


export default function WorkFlowTable() {
const res = useQuery(trpc.workFlow.get.queryOptions());
console.log(res);
const items=res.data?.data

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent  ">
            <TableHead>Name</TableHead>
           
            <TableHead>Status</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (

            <TableRow  key={item.id}>
               <Link params={{workflowId:item.id}} to="/dashboard/$workflowId">
              <TableCell className="font-medium">{item.id}</TableCell></Link>
             
              <TableCell>{item.active ? "Active" :"InActive"}</TableCell>
   
            </TableRow>
 
          ))}
        </TableBody>
       
      </Table>
    
    </div>
  )
}
