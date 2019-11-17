<template>
  <div id="app">
    <weather-forecast/>
  </div>
</template>

<script>
import WeatherForecast from "./components/WeatherForecast";

export default {
  name: "app",

  components: { WeatherForecast },
};
</script>

<style>
</style>
