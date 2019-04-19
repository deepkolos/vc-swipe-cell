import VcSwipeCell from './vc-swipe-cell.vue';

const version = process.VERSION;
const install = function(Vue) {
  if (install.installed) return;
  Vue.component(VcSwipeCell.name, VcSwipeCell);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version
};
export { VcSwipeCell };
