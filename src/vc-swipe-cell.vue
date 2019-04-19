<script src="./vc-swipe-cell.js"></script>
<style src="./vc-swipe-cell.scss" lang="scss" scoped></style>

<template>
  <div
    :class="`vc-swipe-cell cell-base ${state} ${transitionStyle} ${jumpStatus}`"
    @click.capture="injectApi"
  >
    <template
      v-if="['reveal', 'border', 'customized'].includes(transitionStyle)"
    >
      <div class="cell-left-can" ref="leftCan">
        <slot name="btn-left" />
      </div>
      <div
        class="cell-can-bg"
        v-if="btnCanBgColor"
        :style="`background: ${btnCanBgColor}`"
      ></div>
      <div class="cell-right-can" ref="rightCan">
        <slot name="btn-right" />
      </div>
    </template>

    <div class="cell-body-can" ref="body">
      <template v-if="transitionStyle === 'drag'">
        <div class="cell-left-can" ref="leftCan">
          <slot name="btn-left" v-bind="btnScope" />
        </div>
        <div
          class="cell-can-bg"
          v-if="btnCanBgColor"
          :style="`background: ${btnCanBgColor}`"
        ></div>
        <div class="cell-right-can" ref="rightCan">
          <slot name="btn-right" v-bind="btnScope" />
        </div>
      </template>

      <div
        class="cell-body"
        @click.capture="onClick"
        v-swipe:horizonal.lock="swipeConf"
      >
        <slot v-bind="bodyScope" />
      </div>
    </div>
  </div>
</template>
