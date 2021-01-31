<template>
  <div class="cylinders">
    <e-g-cylinder
      v-for="d in graphData"
      :key="d.caption"
      :dataSource="d"
      class="cylinder"
    />
  </div>
</template>

<script>
import EGCylinder from "./CylinderChart.vue";

export default {
  name: "MultiCylinder",
  components: {
    EGCylinder,
  },
  props: {
    dataSource: Object,
  },
  computed: {
    graphData() {
      if (!this.dataSource || !this.dataSource.values) return;
      const data = [];
      this.dataSource.values.forEach((value, i) => {
        const chart = {
          ...this.dataSource.chart,
          caption: this.dataSource.captions[i],
        };
        data.push({ chart, value });
      });
      return data;
    },
  },
};
</script>

<style scoped>
.cylinders {
  display: flex;
}
.cylinder {
  margin: 0 -100px;
}
</style>
