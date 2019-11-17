<template>
  <table class="weather-forecast">
    <tr>
      <th>Time <small>({{time}})</small></th>
      <th>Morning</th>
      <th>Day</th>
      <th>Night</th>
      <th>Humidity</th>
    </tr>
    <tr v-for="day in weatherData" :key="`${displayedCity} - ${day.startTime}`">
      <td><small>{{day.startTime.split(' ')[0]}} - {{day.endTime.split(' ')[0]}}</small></td>
      <td>{{day.morningTemperature.toFixed(0)}}°</td>
      <td>{{day.dayTemperature.toFixed(0)}}°</td>
      <td>{{day.nightTemperature.toFixed(0)}}°</td>
      <td>{{day.humidity.toFixed(0)}}%</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "WeatherForecast",

  props: {
    weatherData: {
      type: Array,
      default: []
    },
  },

  computed: {
    time() {
      return this.weatherData[0].startTime.split(' ')[1] + ' - ' + this.weatherData[0].endTime.split(' ')[1];
    },
    displayedCity() {
      return this.$store.getters.displayedCity;
    }
  }
};
</script>

<style scoped lang="scss">
.weather-forecast {
  margin: auto;
}
</style>
