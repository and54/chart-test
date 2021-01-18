<template>
  <div id="chart-container" ref="container">
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
      @drawComplete="chartLoaded()"
      :style="chartStyle"
    />
    <mask id="chart-mask" />
  </div>
</template>

<script>
export default {
  name: "FusionChartsBars",
  props: {
    dataSource: Object
  },
  data: () => ({
    type: "column2d",
    renderAt: "chart-container",
    width: 550,
    height: 350,
    dataFormat: "json",
    chartStyle: "opacity: 0"
  }),
  methods: {
    chartLoaded() {
      const g = [...document.querySelectorAll("g")].find(g => {
        const c = g.className.animVal;
        return c && !!(c.indexOf('-plot-group') + 1) && !(c.indexOf('-error') + 1)
      });
      const parent = g.parentElement;
      const mask = document.getElementById('chart-mask');

      if (parent === mask) return;

      g.classList.add('full-fill')
      mask.appendChild(g);
      parent.appendChild(mask);
      
      const img = [...document.querySelectorAll("image")].find(i => i.href.animVal === this.dataSource.chart.bgImage);
      img.setAttribute('mask', `url(#${mask.id})`);

      this.chartStyle = null;
    },
  },
};
</script>

<style lang="scss">
.full-fill rect {
  fill: white;
}
</style>