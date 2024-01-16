export const DOUBLE_TAP_SCALE = 3;
export const MAX_SCALE = 6;
export const SPACE_BETWEEN_IMAGES = 40;

export const snapPoint = (value: number, velocity: number, points: ReadonlyArray<number>): number => {
  'worklet';
  const point = value + 0.25 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);

  return points.filter(p => Math.abs(point - p) === minDelta)[0];
};
