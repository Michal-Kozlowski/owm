<template>
  <div>
    <input type="text" v-model="city" @keyup.enter="getData">
    <button @click="getData">get data</button>
    <p v-if="this.error">{{selectedCity}} {{error}}</p>
    <h1>5-day forecast for {{displayedCity}}</h1>
    <div v-if="computedDaysData.length">
      <single-forecast
        v-for="value in values"
        :key="`${displayedCity}-${value}`"
        :data-type="value"
        :forecastData="computedDaysData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DayData } from "../models/DayData";
import { Sample } from "../models/Sample";
import SingleForecast from "../components/SingleForecast";

export default {
  name: "WeatherForecast",

  components: { SingleForecast },

  data() {
    return {
      city: "Wroclaw",
      selectedCity: "",
      displayedCity: "",
      openWeatherMapData: {},
      computedDaysData: [],
      error: "",
      values: [
        "dayTemperature",
        "nightTemperature",
        "morningTemperature",
        "humidity"
      ]
    };
  },

  methods: {
    handleResponse(response) {
      this.computedDaysData = [];
      this.error = "";
      this.selectedCity = "";
      this.displayedCity = response.data.city.name;
      this.openWeatherMapData = response.data.list.map(record => {
        return new Sample(record);
      });

      for (let i = 0; i < 5; i++) {
        const day = this.openWeatherMapData.slice(i * 8, i * 8 + 8);
        this.computedDaysData.push(new DayData(day));
      }
    },
    handleError(error) {
      this.error = error.response.data.message;
      this.selectedCity = this.city;
    },
    getData() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${
            this.city
          }&units=metric&APPID=ea39b5b27b949050360cc47f0f3e9ce1`
        )
        .then(response => this.handleResponse(response))
        .catch(error => this.handleError(error));
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>
