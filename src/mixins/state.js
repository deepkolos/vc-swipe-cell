const STATE_OPTIONS = ['active', 'inactive'];

export default {
  props: {
    state: {
      type: String,
      default: STATE_OPTIONS[0],
      validator: i => STATE_OPTIONS.includes(i)
    }
  }
};
