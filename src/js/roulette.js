import { degreeToRadian } from "./util";

const colors = ["#FBC22B", "#F11486", "#A067AC", "#49A3CF", "#88E444"];

export const drawRoulette = (ctx, angles, size, labels, rotate) => {
  let beginAngle = 0;
  let endAngle = degreeToRadian(rotate) || 0;

  const centerX = size.width / 2;
  const centerY = size.height / 2;
  const radius = size.width * 0.5 * 0.9;

  const radian = angles.map((degree) => {
    return degreeToRadian(degree);
  });
  // Iterate through the angles
  for (let i = 0; i < radian.length; i = i + 1) {
    // Begin where we left off
    beginAngle = endAngle;
    // End Angle
    endAngle = endAngle + radian[i];

    ctx.beginPath();
    // Fill color
    ctx.fillStyle = colors[i % colors.length];

    // Same code as before
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, beginAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();
    // Fill
    ctx.fill();
  }
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 3;
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
};
