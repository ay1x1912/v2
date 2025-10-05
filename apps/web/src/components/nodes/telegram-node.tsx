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

type resendNodeData= {
  label: string;
  to:string,
  msg:string
};

export default function TelegramNode({id ,data}:NodeProps) {
    const { setNodes,getNode } = useReactFlow();
    const nodeData=getNode(id);
    const tokenValue=nodeData?.data.to as string
    const msgValue=nodeData?.data.msg as string
    const chatIdValue=nodeData?.data.msg as string

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                tokenValue: value, // update the field you want
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
  const handleChatIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // update node data
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                chatIdValue: value, // update the field you want
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
          <Label>Axcess Token </Label>
          <Input type='token' value={tokenValue??""} onChange={(e)=>handleTokenChange(e)}   placeholder='Axcess Token'/>
           <Label>Chat Id</Label>
          <Input type='text' value={chatIdValue??""} onChange={(e)=>handleChatIdChange(e)}   placeholder='Chat Id'/>
          <Label>Msg</Label>
          <Input type='text' value={msgValue??""} onChange={(e)=>handleMsgChange(e)}   placeholder='Msg'/>
        </BaseNodeContent>
       <Handle type="target" position={Position.Left}/>
       <Handle type="source" position={Position.Right}/>
      </BaseNode>
    </NodeTooltip>
  );



}





