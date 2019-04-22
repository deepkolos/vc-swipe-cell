# vc-swipe-cell(beta)

![https://travis-ci.com/deepkolos/vc-swipe-cell](https://travis-ci.com/deepkolos/vc-swipe-cell.svg?branch=master)
![](https://img.shields.io/npm/dt/vc-swipe-cell.svg)
![](https://img.shields.io/npm/v/vc-swipe-cell.svg)


一个模仿[SwipeCellKit](https://github.com/SwipeCellKit/SwipeCellKit)的 vue 组件

### [Live Demo](https://deepkolos.github.io/vc-swipe-cell/)

![swipe-cell.gif](https://upload-images.jianshu.io/upload_images/252050-6f2364b723ad796e.gif?imageMogr2/auto-orient/strip)

# Props

| 参数            | 类型    | 默认值 | 可选值                                   | 说明                                 |
| --------------- | ------- | ------ | ---------------------------------------- | ------------------------------------ |
| btnScope        | Object  |        |                                          | 传递参数至 btn-left、btn-right slot  |
| bodyScope       | Object  |        |                                          | 传递参数至 default slot              |
| overflow        | Boolean | true   | true, false                              | 设置是否允许滑动溢出，显示溢出动画   |
| duration        | Number  | 280    |                                          | 设置最大过渡时间，其随滑动加速度改变 |
| threshold       | Number  | 0.2    |                                          | 当滑动超过按钮容器的百分比触发展开   |
| btnCanBgColor   | Number  |        |                                          | 设置按钮容器背景                     |
| expansionStyle  | String  | none   | none, selection, destructive, customized | 设置按钮溢出时行为                   |
| transitionStyle | String  | reveal | reveal, drag, border, customized         | 设置按钮容器滑动时样式               |

# Slots

| 插槽名    | 数目 | 描述       |
| --------- | ---- | ---------- |
| default   | 一个 | 列表项主体 |
| btn-left  | 多个 | 左边按钮   |
| btn-right | 多个 | 右边按钮   |

# Event

| 事件名          | 参数 | 描述                       |
| --------------- | ---- | -------------------------- |
| swipe-start     | Info | 用于自定义 transitionStyle |
| progress-change | Info | 用于自定义 transitionStyle |

## Event Params: Info

| 参数           | 类型   | 描述                                 |
| -------------- | ------ | ------------------------------------ |
| vm             | Object | vc-swipe-cell 的 ViewModel           |
| btns           | Array  | 当前交互的按钮 dom 引用              |
| percent        | Number | 范围[0, 1]，表示触发行为的百分比进度 |
| currState      | Object | 当前状态，stateMachine 的一个状态    |
| nextState      | Object | 下一个状态，stateMachine 的一个状态  |
| btnsWidth      | Array  | 当前交互的按钮的宽度信息             |
| btnCanWidth    | Number | 当前交互的按钮容器宽度信息           |
| startVelocityX | Number | 滑动的初始的速度                     |

# VM Public Methods

| name              | params   | 描述                     |
| ----------------- | -------- | ------------------------ |
| expand            | 'left'   | 展开左/右按钮            |
| unexpand          |          | 返回默认状态             |
| onceUnexpand(TDB) | callback | 返回默认状态，并执行回调 |

# Demo Code

```vue
<!-- prettier-ignore -->
<template>
  <div>
    <vc-swipe-cell class="msg-swipe-cell" ref="swipeCell" transitionStyle="reveal">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
      </template>
    </vc-swipe-cell>
  </div>
</template>

<script>
import { VcSwipeCell } from 'vc-swipe-cell';
import MsgContent from '../components/msg-content';

export default {
  components: {
    MsgContent,
    VcSwipeCell
  },

  methods: {
    log(str) {
      console.log(str);
    },
  ｝
}
</script>
```

> 详情请移步至[demo/pages/swipe-cell.vue](https://github.com/deepkolos/vc-swipe-cell/blob/master/demo/pages/swipe-cell.vue)

# TODO

0. Expansion Styles 的实现

# License

MIT 一起来扣细节~
