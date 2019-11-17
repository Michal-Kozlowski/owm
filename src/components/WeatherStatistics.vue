<template>
  <div class="weather-statistics">
    <div class="weather-statistics__city">
      <input type="text" @focus="city=''" v-model="city" @keyup.enter="getData">
      <button @click="getData">Change City</button>
    </div>
    <div class="weather-statistics__error">
      <p v-if="this.error" class="weather-statistics__error-message">{{selectedCity}} {{error}}</p>
    </div>
    <div v-if="computedDaysData.length">
      <weather-forecast :weatherData="computedDaysData"/>
      <single-statistics
        v-for="value in values"
        :key="`${displayedCity}-${value}`"
        :data-type="value"
        :statisticsData="computedDaysData"
      />
    </div>
    <div v-else class="loader">Loading...</div>
  </div>
</template>

<script>
import axios from "axios";
import { DayData } from "../models/DayData";
import { Sample } from "../models/Sample";
import SingleStatistics from "../components/SingleStatistics";
import WeatherForecast from "../components/WeatherForecast";

export default {
  name: "WeatherStatistics",

  components: { SingleStatistics, WeatherForecast },

  data() {
    return {
      city: "Wroclaw",
      selectedCity: "",
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

  computed: {
    displayedCity() {
      return this.$store.getters.displayedCity;
    }
  },

  methods: {
    handleResponse(response) {
      this.computedDaysData = [];
      this.error = "";
      this.selectedCity = "";
      this.$store.dispatch("displayed_city", response.data.city.name);
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

<style scoped lang="scss">
.weather-statistics {
  width: 600px;
  max-width: 90vw;
  padding: 20px;
  margin: auto;
  text-align: center;

  &__error {
    height: 20px;
  }

  &__error-message {
    margin: 0;
    color: red;
  }
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
