<template>
  <div class="single-statistics">
    <h3 class="single-statistics__title">{{dataType.replace(/([A-Z])/g, ' $1').trim()}}</h3>
    <p class="single-statistics__data">
      <span>min: {{min.toFixed(1)}}{{unit}} | </span>
      <span>mean: <strong>{{mean.toFixed(1)}}{{unit}}</strong> | </span>
      <span>max: {{max.toFixed(1)}}{{unit}} | </span>
      <span>{{modes.length > 1 ? 'modes:' : 'mode:'}} {{modes.join(`${unit}, `)}}{{unit}}</span>
    </p>
  </div>
</template>

<script>
import { DataTracker } from "../models/DataTracker";

export default {
  name: "WeatherStatistics",
  props: {
    dataType: {
      type: String,
      default: ""
    },
    statisticsData: {
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
  computed: {
    unit() {
      if (this.dataType.toLowerCase().includes('temperature')) {
        return '°';
      }
      if (this.dataType.toLowerCase().includes('humidity')) {
        return '%'
      }
    }
  },
  mounted() {
    this.dataForOneValue = new DataTracker(this.statisticsData);
    this.dataForOneValue.insert(`${this.dataType}`);
    this.min = this.dataForOneValue.showMin();
    this.max = this.dataForOneValue.showMax();
    this.mean = this.dataForOneValue.showMean();
    this.modes = this.dataForOneValue.showMode();
  }
};
</script>

<style scoped lang="scss">
.single-statistics {
  margin-top: 30px;

  &__title {
    text-transform: capitalize;
    margin: 0;
  }

  &__data {
    margin: 10px 0 0;
  }
}
</style>
