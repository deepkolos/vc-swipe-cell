import { on, off } from 'util/dom';
// import { debounce } from 'util/debounce';

export default {
  mounted() {
    on(window, 'resize', this.updateSize);

    // 让组件里的mounted先执行
    this.$nextTick(() => {
      this.updateSize();
    });
  },

  destroyed() {
    off(window, 'resize', this.updateSize);
  }

  // methods: {
  //   updateSize() {}
  // }
};
