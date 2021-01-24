<template>
  <div :id="renderAt">
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
      @drawComplete="cylinderLoaded()"
      :style="chartStyle"
    />
    <mask :id="maskId" />
  </div>
</template>

<script>
import { randomName } from '@/utils';

export default {
  name: "FusionChartsCylinder",
  props: {
    dataSource: Object
  },
  data: () => ({
    type: "cylinder",
    renderAt: randomName(),
    width: 550,
    height: 350,
    dataFormat: "json",
    chartStyle: "opacity: 0",
    maskId: randomName(),
    appliedImg: false,
  }),
  methods: {
    cylinderLoaded() {
      if (this.appliedImg) return;

      const cont = document.getElementById(this.renderAt);
      const g = [...cont.querySelectorAll("g")].find(g => {
        const c = g.className.animVal;
        return c && !!(c.indexOf('-cylinder') + 1) && !(c.indexOf('-error') + 1)
      });

      const path = g.querySelectorAll("path");
      const mask = cont.querySelectorAll(`#${this.maskId}`)[0];

      if (g === mask) return;

      mask.classList.add('full-fill');
      mask.appendChild(path[4]);
      mask.appendChild(path[2]);
      g.appendChild(mask);
      g.insertBefore(mask, path[0])
      
      const img = [...cont.querySelectorAll("image")].find(i => i.href.animVal === this.dataSource.chart.bgImage);
      img.setAttribute('mask', `url(#${this.maskId})`);

      this.chartStyle = null;
      this.appliedImg = true;
    },
    rounded: () => Math.round(Math.random() * 1000),
  },
};
</script>

<style lang="scss">
.full-fill * {
  fill: white !important;
}
</style>