<template>
  <div :id="renderAt">
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
      @drawComplete="chartLoaded()"
      :style="chartStyle"
    />
    <mask :id="maskId" />
  </div>
</template>

<script>
import { randomName } from '@/utils';

export default {
  name: "FusionChartsBars",
  props: {
    dataSource: Object
  },
  data: () => ({
    type: "column2d",
    renderAt: randomName(),
    width: 550,
    height: 350,
    dataFormat: "json",
    chartStyle: "opacity: 0",
    maskId:randomName(),
    appliedImg: false,
  }),
  methods: {
    chartLoaded() {
      if (this.appliedImg) return;

      const cont = document.getElementById(this.renderAt);
      const g = [...cont.querySelectorAll("g")].find(g => {
        const c = g.className.animVal;
        return c && !!(c.indexOf('-plot-group') + 1) && !(c.indexOf('-error') + 1)
      });
      const parent = g.parentElement;
      const mask = cont.querySelectorAll(`#${this.maskId}`)[0];

      if (parent === mask) return;

      g.classList.add('full-fill')
      mask.appendChild(g);
      parent.appendChild(mask);
      
      const img = [...cont.querySelectorAll("image")].find(i => i.href.animVal === this.dataSource.chart.bgImage);
      img.setAttribute('mask', `url(#${this.maskId})`);

      this.chartStyle = null;
      this.appliedImg = true;
    },
  },
};
</script>

<style lang="scss">
.full-fill rect {
  fill: white;
}
</style>