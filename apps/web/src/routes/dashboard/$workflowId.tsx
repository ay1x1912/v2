



import { ReactFlowApp } from '@/components/costom-reactflow'
import Page from '@/components/dashboard-layout'
import WorkFlowTable from '@/components/workflow-table'
import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { ReactFlowProvider, type Edge, type Node } from '@xyflow/react'


export const Route = createFileRoute('/dashboard/$workflowId')({
     loader: async ({ params }) => {
    return params.workflowId
  },
  component: RouteComponent,
})

function RouteComponent() {
    const {workflowId}=useParams({strict:false})
    const res=useQuery(trpc.workFlow.getById.queryOptions({workFlowId:workflowId!}))
    if(res.data?.error || !res.data?.data){
      return (
        <div>
          Failed to load data
        </div>
      )
    }
    const data=res.data.data
  return (

	<div className='w-full h-full'>
<ReactFlowApp initialEdges={data.edgeData as Edge[] }  initialNodes={data.nodeData as Node[] }/>


  </div>

  )
}


