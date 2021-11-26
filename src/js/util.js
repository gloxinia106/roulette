export const degreeToRadian = (degree) => (degree * Math.PI) / 180;

export const percentToDegree = (percent) => {
  const degree = (360 * percent) / 100;
  return Math.round(degree * 100) / 100;
};
