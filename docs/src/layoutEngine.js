import dagre from 'dagre';

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const nodeWidth = 172;
  const nodeHeight = 40;

  dagreGraph.setGraph({ 
    rankdir: direction, 
    marginx: 50, 
    marginy: 50,
    nodesep: 80,
    ranksep: 100
  });

  // Map to find a node's top-level parent
  const getTopLevelParent = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return nodeId;
    if (node.parentId) return getTopLevelParent(node.parentId);
    return nodeId;
  };

  // Add only top-level nodes to dagre
  nodes.forEach((node) => {
    if (!node.parentId) {
      const width = node.style?.width || nodeWidth;
      const height = node.style?.height || nodeHeight;
      dagreGraph.setNode(node.id, { width, height });
    }
  });

  // For edges, connect their top-level parents in dagre so groups are laid out properly
  edges.forEach((edge) => {
    const sourceParent = getTopLevelParent(edge.source);
    const targetParent = getTopLevelParent(edge.target);
    if (sourceParent !== targetParent) {
      dagreGraph.setEdge(sourceParent, targetParent);
    }
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    if (!node.parentId) {
      const nodeWithPosition = dagreGraph.node(node.id);
      if (nodeWithPosition) {
        node.position = {
          x: nodeWithPosition.x - (node.style?.width || nodeWidth) / 2,
          y: nodeWithPosition.y - (node.style?.height || nodeHeight) / 2,
        };
      }
    }
    return node;
  });

  return { nodes: layoutedNodes, edges };
};
