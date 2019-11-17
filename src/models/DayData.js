export class DayData {
  constructor(data) {
    this.dayTemperature = null;
    this.nightTemperature = null;
    this.morningTemperature = null;
    this.humidity = null;
    this.startTime = '';
    this.endTime = '';

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (i === 0) {
        this.startTime = element.date;
      }
      if (i === 7) {
        this.endTime = element.date;
      }
      if (element.date.includes('12:00:00')) {
        this.dayTemperature = element.temperature;
      }
      if (element.date.includes('03:00:00')) {
        this.nightTemperature = element.temperature;
      }
      if (element.date.includes('09:00:00')) {
        this.morningTemperature = element.temperature;
      }
      this.humidity += element.humidity / data.length;
    }
  }
}
