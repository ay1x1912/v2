import { useState } from "react";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "../node-tooltip";
import { BaseNode, BaseNodeContent } from "../base-node";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Handle, Position } from "@xyflow/react";
import { Button } from "../ui/button";

export default function ManualNode() {


  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>Hidden Content</NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger className="text-center">Manual </NodeTooltipTrigger>
         <Button onClick={()=>console.log("manual clicked ")}>Click me </Button>
        </BaseNodeContent>
       <Handle type="source" position={Position.Right}/>
      </BaseNode>
    </NodeTooltip>
  );
}