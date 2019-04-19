<style lang="scss" scoped>
.msg {
  padding: 10px;
  background: #ffffff;

  &-head {
    display: flex;

    &-user {
      font-weight: 700;
      font-size: 16px;
      color: #2f2f2f;
    }

    &-time {
      font-weight: 500;
      color: #9f9f9f;
      font-size: 15px;
    }
  }

  &-title {
    color: #2f2f2f;
    font-size: 15px;
  }

  &-content {
    color: #a7a6a6;
    font-size: 15px;
  }
}
</style>

<template>
  <div class="msg" v-once>
    <div class="msg-head">
      <div class="msg-head-user flex-auto">Realm</div>
      <div class="msg-head-time">3:06 PM</div>
    </div>
    <div class="msg-title ellipsis-line-1">Video: Operators and Strong Opinions with Erica Sang...</div>
    <div class="msg-content ellipsis-line-2">
      swift operators are flexible and powerful. They're symobals that behave like functions, adopting a natural...
    </div>
  </div>
</template>
