import { useCallback, useState } from 'react';
import {Grid, Button,Container} from "@mui/material";

import ReactFlow, { MiniMap, Controls, applyEdgeChanges, Node, applyNodeChanges, NodeChange} from 'react-flow-renderer';
export interface FlowProps {
    nodes: Array<any>;
    edges?: any;
}
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];
  
const initialNodes: Node [] = [
    {
      id: '1',
      type: 'input',
      data: { 
        label: 'Input Node',
    
    },
      position: { x: 250, y: 25 },
    },
  
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
  ];
  export const initialNodeProps: FlowProps = {
    nodes: initialNodes
  }
function Flow(flowProps: FlowProps) {
    const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onNodesChange = useCallback(
    (changes:NodeChange []) => setNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
      const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
      );

  return (
        <Container style={{height: '100%', width: '100%'}}>
            <div style={{height: '100%', width: '100%'}}>
                <ReactFlow 
                style = {{
                    backgroundColor: "#B8CEFF"
                }}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                defaultNodes={flowProps.nodes}  defaultEdges={flowProps.nodes}>
                <MiniMap />
                <Controls />
                </ReactFlow>
            </div>
        </Container>
  );
}
export default Flow