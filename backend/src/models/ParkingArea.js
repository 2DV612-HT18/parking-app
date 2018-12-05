export default class ParkingArea {
  constructor(
    id,
    name,
    topLeftCoordinate,
    topRightCoordinate,
    bottomLeftCoordinate,
    bottomRightCoordinate
  ) {
    this.id = id;
    this.name = name;
    this.topLeftCoordinate = topLeftCoordinate;
    this.topRightCoordinate = topRightCoordinate;
    this.bottomLeftCoordinate = bottomLeftCoordinate;
    this.bottomRightCoordinate = bottomRightCoordinate;
  }
}
