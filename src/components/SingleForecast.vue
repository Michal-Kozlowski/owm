<template>
  <div id="forecast">
    <h2>{{dataType}}</h2>
    <p>
      <span>min: {{min.toFixed(1)}} | </span>
      <span>max: {{max.toFixed(1)}} | </span>
      <span>mean: {{mean.toFixed(1)}} | </span>
      <span>{{modes.length > 1 ? 'modes:' : 'mode:'}} {{modes.join(' ')}} |</span>
    </p>
  </div>
</template>

<script>
import { DataTracker } from "../models/DataTracker";

export default {
  name: "WeatherForecast",
  props: {
    dataType: {
      type: String,
      default: ""
    },
    forecastData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dataForOneValue: {},
      min: 0,
      max: 0,
      mean: 0,
      modes: []
    };
  },
  mounted() {
    this.dataForOneValue = new DataTracker(this.forecastData);
    this.dataForOneValue.insert(`${this.dataType}`);
    this.min = this.dataForOneValue.showMin();
    this.max = this.dataForOneValue.showMax();
    this.mean = this.dataForOneValue.showMean();
    this.modes = this.dataForOneValue.showMode();
  }
};
</script>

<style>
</style>
