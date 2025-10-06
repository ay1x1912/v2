import { useState } from "react";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "../node-tooltip";
import { BaseNode, BaseNodeContent } from "../base-node";

import { Handle, Position, useReactFlow, useStore, useStoreApi, type NodeProps } from "@xyflow/react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function ResendNode({id ,data}:NodeProps) {
    const { setNodes,getNode } = useReactFlow();
    const nodeData=getNode(id);
    const toValue=nodeData?.data.to as string
    const msgValue=nodeData?.data.msg as string

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    // update node data
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                to: value, // update the field you want
              },
            }
          : node
      )
    );
  };
    const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // update node data
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                msg: value, // update the field you want
              },
            }
          : node
      )
    );
  };
 
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>Hidden Content</NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger>Send Email</NodeTooltipTrigger>
          <Label>To</Label>
          <Input type='email' value={toValue??""} onChange={(e)=>handleToChange(e)}   placeholder='To email'/>
           <Label>Msg</Label>
          <Input type='text' value={msgValue??""} onChange={(e)=>handleMsgChange(e)}   placeholder='enter email'/>
        </BaseNodeContent>
       <Handle type="target" position={Position.Left}/>
       <Handle type="source" position={Position.Right}/>
      </BaseNode>
    </NodeTooltip>
  );



}





