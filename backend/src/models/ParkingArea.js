export default class ParkingArea {
  constructor(
    id,
    name,
    owner,
    topLeftCoordinate,
    topRightCoordinate,
    bottomLeftCoordinate,
    bottomRightCoordinate
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.topLeftCoordinate = topLeftCoordinate;
    this.topRightCoordinate = topRightCoordinate;
    this.bottomLeftCoordinate = bottomLeftCoordinate;
    this.bottomRightCoordinate = bottomRightCoordinate;
  }
}
