export const restrictRange = (curr, min, max) => {
  return curr < min ? min : curr > max ? max : curr;
};

export const fillPercent = percent => {
  if (percent > -0.009 && percent < 0.009) return 0;
  if (percent > 0.991 && percent < 1.009) return 1;
  return percent;
};
