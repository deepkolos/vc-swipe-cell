export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timeStamp = Date.now();
  }
}

export default class VelocityTracker {
  constructor(len = 5) {
    this.pointsLen = len;
    this.clear();
  }

  destroy() {
    this.pointsLen = null;
    this.points.length = 0;
  }
  clear() {
    this.points = new Array(this.pointsLen);
  }
  addMovement(point) {
    this.points.pop();
    this.points.unshift(new Point(point.x, point.y));
  }
  getPoint(lastPointCount = 0) {
    return this.points[lastPointCount];
  }
  getXVelocity(lastPointCount = 1, predictTime) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];

    if (!endPoint || !startPoint) return 0;
    if (predictTime && predictTime - startPoint.timeStamp > 80) return 0;

    return (
      (endPoint.x - startPoint.x) / (endPoint.timeStamp - startPoint.timeStamp)
    );
  }
  getYVelocity(lastPointCount = 1, predictTime) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];

    if (!endPoint || !startPoint) return 0;
    if (predictTime && predictTime - startPoint.timeStamp > 80) return 0;

    return (
      (endPoint.y - startPoint.y) / (endPoint.timeStamp - startPoint.timeStamp)
    );
  }
  getXAcceleration(lastPointCount = 1) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];

    if (!endPoint || !startPoint) return 0;

    return (
      (endPoint.x - startPoint.x) /
      Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2)
    );
  }
  getYAcceleration(lastPointCount = 1) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];

    if (!endPoint || !startPoint) return 0;

    return (
      (endPoint.y - startPoint.y) /
      Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2)
    );
  }
  predictX(a = -0.001) {
    const v0 = this.getXVelocity(1, Date.now());
    const d = v0 > 0 ? 1 : -1;
    let t = (-v0 / a) * d;
    let s = (((-1 / 2) * v0 * v0) / a) * d;
    return { s, t };
  }
  predictY(a = -0.001) {
    const v0 = this.getYVelocity(1, Date.now());
    const d = v0 > 0 ? 1 : -1;
    let t = (-v0 / a) * d;
    let s = (((-1 / 2) * v0 * v0) / a) * d;
    return { s, t };
  }
}
