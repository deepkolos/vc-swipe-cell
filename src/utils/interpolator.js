export const Interpolator = {
  easeOutQuint: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function(t) {
      return 1 + --t * t * t * t * t;
    }
  }
};
