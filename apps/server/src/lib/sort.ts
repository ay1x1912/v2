import type { Edge } from "@xyflow/react";

export const sortWorkFlow=(edges:Edge[])=>{

    const sorted:string[]=[];

    for (const edge of edges) {
        if(!sorted.includes(edge.source)){
            sorted.push(edge.source)
        }
        if(!sorted.includes(edge.target)){
            sorted.push(edge.target)
        }
    }

    return sorted

}