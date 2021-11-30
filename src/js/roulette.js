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

  // 룰렛 그리기
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

  let textAngle = degreeToRadian(rotate) || 0;

  // 텍스트 그리기
  for (let i = 0; i < radian.length; i = i + 1) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(textAngle + radian[i] / 2);
    ctx.moveTo(0, 0);
    ctx.font = "36px Sans-serif";
    ctx.strokeStyle = "black"; // 'black';
    ctx.lineWidth = 5;
    ctx.strokeText(labels[i], radius / 4, 8);
    ctx.fillStyle = "white";
    ctx.fillText(labels[i], radius / 4, 8);
    ctx.restore();
    textAngle += radian[i];
  }

  // 원 테두리 그리기
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 3;
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // 핀 그리기
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius + 5);
  ctx.lineTo(centerX - 5, centerY - radius - 10);
  ctx.lineTo(centerX - 5, centerY - radius - 15);
  ctx.lineTo(centerX + 5, centerY - radius - 15);
  ctx.lineTo(centerX + 5, centerY - radius - 10);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
};
