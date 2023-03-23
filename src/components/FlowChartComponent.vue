<template>
  <div>
    <svg class="flowchart" width="800" height="800">
      <!-- Draw links -->
      <g v-for="link in links" :key="link.id">
        <path :d="getPath(link)" class="link" />
      </g>

      <!-- Draw nodes -->
      <g v-for="node in nodes" :key="node.id">
        <rect
          :x="node.x - 100"
          :y="node.y - 30"
          width="400"
          height="100"
          class="node"
        />
        <text :x="node.x" :y="node.y + 10" class="label">
          <tspan x="{{ node.x }}" dx="7.2em">{{ node.label }}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
import { DASHBOARD_CONTENT } from "../Commons/Constants";
export default {
  name: "FlowChart",
  data() {
    return {
      nodes: DASHBOARD_CONTENT.NODES,
      links: DASHBOARD_CONTENT.LINKS,
    };
  },
  methods: {
    getPath(link) {
      const sourceNode = this.nodes.find((node) => node.id === link.source);
      const targetNode = this.nodes.find((node) => node.id === link.target);

      const x1 = sourceNode.x + 100;
      const y1 = sourceNode.y + 50;
      const x2 = targetNode.x + 100;
      const y2 = targetNode.y + 50;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dr = Math.sqrt(dx * dx + dy * dy) + 500;

      return `M${x1},${y1}A${dr + 550},${dr + 350} 0 0,1 ${x2},${y2}`;
    },
  },
};
</script>

<style>
.flowchart {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  width: 100%;
}

.node {
  fill: #fff;
  stroke: #0fa774;
  stroke-width: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.label {
  fill: #333;
  font-size: 14px;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
  font-family: monospace;
}

.link {
  stroke: #a7a409;
  stroke-width: 2;
  fill: none;
}
</style>
