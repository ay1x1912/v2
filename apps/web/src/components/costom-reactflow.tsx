export type NodeOrigin = [number, number];
import React, { useCallback, useRef} from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  type Connection,

  type Edge,

  type Node,
 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ResendNode from './nodes/resend-node';
import { Button } from './ui/button';
import ManualNode from './nodes/manual-node';
import TelegramNode from './nodes/telegram-node';


const nodeTypes = {
resendNode:ResendNode,
manualNode:ManualNode,
telegramNode:TelegramNode
};


let id = 1;
const getId = () => `${id++}`;
const nodeOrigin:NodeOrigin = [0.5, 0];

interface ReactFlowAppProps{
  initialNodes:Node[]|[],
  initialEdges:Edge[]|[]

}

export const ReactFlowApp = ({initialNodes,initialEdges}:ReactFlowAppProps) => {
  const reactFlowWrapper = useRef(null);

  
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes ??[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges??[]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params:Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

      
      const addNode = useCallback((
        nodeType:string,
      ) => {
        const newNode = {
          id: `new-node-${nodes.length + 1}`, // Generate a unique ID
          position: { x: Math.random() * 400, y: Math.random() * 300 }, // Random position
          data: { label: `${nodeType} ${nodes.length + 1}` },
          type:nodeType
        };
    
        setNodes((nds) => nds.concat(newNode)); // Add the new node to the existing ones
      }, [nodes, setNodes])

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <Button onClick={()=>addNode("resendNode")}>send email node</Button>
      <Button onClick={()=>addNode("manualNode")}>Manual node</Button>
      <Button onClick={()=>addNode("telegramNode")}>Telegram node</Button>


      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
  
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};




