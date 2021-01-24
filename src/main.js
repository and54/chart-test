import Vue from 'vue';
import App from './App.vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import Cylinder from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme, Cylinder);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
