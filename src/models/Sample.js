export class Sample {
  constructor(record) {
    this.date = record.dt_txt;
    this.temperature = Number(record.main.temp);
    this.humidity = Number(record.main.humidity);
  }
}