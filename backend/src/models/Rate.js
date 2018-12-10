export default class Rate {
  constructor(id, startTime, endTime, startDate, endDate, charge, repeat, parkingArea) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.startDate = startDate;
    this.endDate = endDate;
    this.charge = charge;
    this.repeat = repeat;
    this.parkingArea = parkingArea;
  }
}
