import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ReactFlow, Controls, Background, MiniMap, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';
import { getLayoutedElements } from '../layoutEngine';

// Initialize Mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'Inter, sans-serif'
});

export default function FlowViewer({ diagram }) {
  const mermaidRef = useRef(null);
  const [panZoom, setPanZoom] = useState(null);

  // Layout React Flow nodes when diagram changes
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    if (diagram.type !== 'react-flow') return { nodes: [], edges: [] };
    return getLayoutedElements(diagram.nodes, diagram.edges, diagram.layout);
  }, [diagram]);

  useEffect(() => {
    if (diagram.type === 'mermaid') {
      const renderMermaid = async () => {
        if (panZoom) {
          panZoom.destroy();
          setPanZoom(null);
        }
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '<div class="loader">Loading...</div>';
          try {
            const { svg } = await mermaid.render(`m-${diagram.id}-${Date.now()}`, diagram.code);
            mermaidRef.current.innerHTML = svg;
            
            const svgElement = mermaidRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.width = '100%';
              svgElement.style.height = '100%';
              svgElement.style.maxWidth = '100%';
              
              const pz = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: false,
                fit: true,
                center: true
              });
              setPanZoom(pz);
            }
          } catch (e) {
            console.error(e);
            mermaidRef.current.innerHTML = `<div class="error">Error rendering diagram</div>`;
          }
        }
      };
      renderMermaid();
    }
  }, [diagram]);

  if (diagram.type === 'intro') {
    return (
      <div className="intro-container">
        <div dangerouslySetInnerHTML={{ __html: diagram.content }} />
      </div>
    );
  }

  if (diagram.type === 'mermaid') {
    return (
      <div className="mermaid-container">
        <div ref={mermaidRef} className="mermaid-viewer" />
      </div>
    );
  }

  // React Flow Renderer
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        fitView
        attributionPosition="bottom-right"
        className="dark-theme-flow"
        nodesDraggable={false} // Disable dragging for strict architecture layout
      >
        <Background color="#52525b" gap={16} />
        <Controls />
        <MiniMap nodeStrokeColor="#52525b" nodeColor="#18181b" maskColor="rgba(0,0,0,0.5)" />
        <Panel position="top-right">
          <div className="panel-hint">Auto-laid out via Dagre</div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
