import type { Node } from "@xyflow/react";

const manual=async () => {
    console.log("manual node called")
}
const resend=async () => {
    console.log("resend node called")
}
const telegram=async () => {
    console.log("telegram node called")
}
const nodeFunctions:Record<string,()=>Promise<any> >={
   "manualNode":manual,
   "resendNode":resend,
   "telegramNode":telegram
}

export async function executeWorkFlow(sorted:string[],nodes:Node[]) {
 
    for (const id of sorted) {
      const selectedNode=nodes.filter((node)=>node.id==id)
        const fn=nodeFunctions[selectedNode[0].type!]
    if (!fn) throw new Error(`Unknown node type: ${selectedNode[0].type!}`);

    const output = await fn();
        
    }
}