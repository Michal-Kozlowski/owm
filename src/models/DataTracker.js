export class DataTracker {
  constructor(data) {
    this.records = data;
    this.filteredRecords = {};
  }

  insert(value) {
    this.filteredRecords = this.records.map(record => record[value]);
  }

  showMin() {
    return this.filteredRecords
      .reduce((min, current) => min < current ? min : current, Infinity);
  }

  showMax() {
    return this.filteredRecords
    .reduce((max, current) => max > current ? max : current, -Infinity);
  }

  showMean() {
    return this.filteredRecords
      .reduce((total, current) => total + current) / this.records.length;
  }

  showMode() {
    let numbers = this.filteredRecords;
    let roundedNumbers = numbers.map(number => Math.round(number));
    let sortedNumbers = roundedNumbers.sort((a, b) => a - b);
    let count = [];
    let maxCount = null;
    let modes = [];

    for (let i = 0; i < sortedNumbers.length; i++) {
      let number = sortedNumbers[i];
      count[number] = count[number] ? count[number] + 1 : 1;
      if (count[number] > maxCount) {
        maxCount = count[number];
      }
    }

    for (let i = 0; i < count.length; i++) {
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxCount) {
          modes.push(Number(i));
        }
      }
    }

    return modes;
  }
}
