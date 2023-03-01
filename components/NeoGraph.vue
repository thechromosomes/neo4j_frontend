<template>
  <div class="neo4j_graph">
    <cytoscape ref="cy" :config="config" >
      <cy-element
        v-for="def in data"
        :key="`${def.data.id}`"
        :definition="def"
      />
    </cytoscape>
    <v-btn v-if="true" fab fixed bottom right class="ma-4" color="red">
      Employee
    </v-btn>
    <v-btn v-if="true" fab fixed bottom right class="ma-4 mb-16" color="green">
      Manager
    </v-btn>
  </div>
</template>
<script>
import VueCytoscape from "vue-cytoscape";
import Vue from "vue";

Vue.use(VueCytoscape);

export default {
  props: ["data"],
  data() {
    return {
      config: {
        style: [
          {
            selector: "node",
            style: {
              "background-color": (node) => {
                console.log("node", node.data().labels);
                if (node.data().labels.includes("Employee")) {
                  return "red";
                } else if (node.data().labels.includes("Manager")) {
                  return "green";
                } else {
                  return "gray";
                }
              },
              label: "data(name)",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
              "label": "Mgr",
            },
          },
        ],
        layout: {
          name: "cose",
          padding: 50,
          spacingFactor: 1,
        },
      },
    };
  },
};
</script>

