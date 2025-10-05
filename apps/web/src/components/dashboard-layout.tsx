import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Outlet, useParams } from '@tanstack/react-router'
import type React from 'react'
import type { HtmlHTMLAttributes } from 'react'
import { Button } from './ui/button'
import { queryClient, trpc } from '@/utils/trpc'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import WorkFlowTable from './workflow-table'

import { authClient } from '@/lib/auth-client'
import { useReactFlow } from '@xyflow/react'


export default function DashboardLayout() {

    const reactFlow=useReactFlow();
    const createWorkFlow=useMutation(trpc.workFlow.create.mutationOptions({
      onSuccess:({data})=>{toast(`workFlow create with id ${data.id}`)
     queryClient.invalidateQueries(trpc.workFlow.get.queryOptions())
    },
      onError:()=>toast('error occured during workflow creation ')
    }))
    
 const saveWorkFlow=useMutation(trpc.workFlow.put.mutationOptions({
   onSuccess:({data})=>{toast(`workFlow  with id ${data.id} saved sussesfuly`)
     queryClient.invalidateQueries(trpc.workFlow.getById.queryOptions({workFlowId:data.id}))
    },
      onError:()=>toast('error occured during workflow saving ')
 }))

const executeWorkFlow=useMutation(trpc.workFlow.execute.mutationOptions({
    onSuccess:({})=>{toast(`workFlow  with id  executed sussesfuly`)
     
    },
      onError:()=>toast('error occured during workflow execution ')
}))



  const handleCreateWorkFlow= () => {
    createWorkFlow.mutate()
    console.log("clicked")
    
  }

  
 const handleSaveeWorkFlow=()=>{
const id=params.workflowId;
if(!id){
  toast("no workflowid provided")
  return 
}
  saveWorkFlow.mutate({
    id,
    nodeData:reactFlow.getNodes(),
    edgeData:reactFlow.getEdges()
  })
  console.log(" saved clicked")
 }



   
 const handleExecuteWorkFlow=()=>{
  const id=params.workflowId;
if(!id){
  toast("no workflowid provided")
  return 
}
executeWorkFlow.mutate({workFlowId:id})
  console.log(" execute clicked")
 }


  const params=useParams({strict:false})
  return (
    <SidebarProvider> 
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
      
         {params.workflowId? (

          <div>
             <Button
            onClick={handleSaveeWorkFlow}
            >Save WorkFlow</Button>

             <Button
            onClick={handleExecuteWorkFlow}
            >Execute  WorkFlow</Button>
          </div>
           
         ):( <Button
            onClick={handleCreateWorkFlow}
            >Create WorkFlow</Button>)}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
          <Outlet/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
