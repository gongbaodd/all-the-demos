const HOUR_ANGLE = 360 / 12;
const MINUTE_ANGLE = 360 / 60;

/**
 * @param {string} time
 * @returns {number}
 */
function angle(time) {
  // your code here
  let [hour, minute] = time.split(":").map(Number);

  if (hour > 12) hour -= 12;

  const hourAngle = HOUR_ANGLE * hour + (HOUR_ANGLE * minute) / 60;
  const minuteAngle = MINUTE_ANGLE * minute;
  const angle = Math.abs(hourAngle - minuteAngle);
  return Math.round(Math.min(angle, Math.abs(360 - angle)));
}
