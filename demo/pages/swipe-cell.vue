<style lang="scss" scoped>
.msg {
  &-swipe-cell {
    margin-bottom: 20px;

    /deep/ {
      & .cell-right-can,
      & .cell-left-can {
        display: flex;
      }
    }

    &.customized {
      /deep/ {
        & .cell-right-can,
        & .cell-left-can {
          background: #f3f3f3;
        }
      }

      .msg-btn {
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
          height: 55px;
          width: 55px;
          text-align: center;
          line-height: 55px;
          border-radius: 50%;
          transition: transform ease;
        }

        &.more div {
          background: #e0e0e0;
        }
        &.flag div {
          background: #fa9f00;
        }
        &.delete div {
          background: #f94e37;
        }
        &.read div {
          background: #2a87fe;
        }
      }
    }

    &.border {
      .msg-btn {
        position: relative;
        z-index: 0;

        &::after {
          content: ' ';
          display: block;
          position: absolute;
          width: 100vw;
          top: 0;
          bottom: 0;
          z-index: -1;
        }

        &.more::after {
          background: #e0e0e0;
        }
        &.flag::after {
          background: #fa9f00;
        }
        &.delete::after {
          background: #f94e37;
        }
        &.read::after {
          background: #2a87fe;
        }
      }
      /deep/ .cell-left-can {
        .msg-btn::after {
          left: 0;
          transform: translateX(-100%);
        }
      }
      /deep/ .cell-right-can {
        .msg-btn::after {
          right: 0;
          transform: translateX(100%);
        }
      }
    }
  }

  &-btn {
    width: 70px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    color: white;

    &.more {
      background: #e0e0e0;
    }
    &.flag {
      background: #fa9f00;
    }
    &.delete {
      background: #f94e37;
    }
    &.read {
      background: #2a87fe;
    }
  }
}

h4,
h3,
p {
  margin: 0;
  padding: 8px;
}
</style>

<template>
  <div>
    <h3>Transition Styles</h3>

    <h4>Reveal</h4>
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

    <h4>Drag</h4>
    <vc-swipe-cell class="msg-swipe-cell" transitionStyle="drag">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h4>Border</h4>
    <vc-swipe-cell class="msg-swipe-cell border" transitionStyle="border" ref="borderSwipeCell">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h4>Customized</h4>
    <vc-swipe-cell class="msg-swipe-cell customized" transitionStyle="customized" @progress-change="onProgressChange" btnCanBgColor="#f3f3f3">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">
          <div>Delete</div>
        </div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">
          <div>Flag</div>
        </div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">
          <div>More</div>
        </div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">
          <div>More</div>
        </div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">
          <div>Flag</div>
        </div>
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">
          <div>Delete</div>
        </div>
      </template>
    </vc-swipe-cell>

    <h3>Support fast interaction</h3>
    <p>you can change state fast and correctly during committing transition</p>
    <vc-swipe-cell class="msg-swipe-cell" transitionStyle="border" :duration="2000">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h3>Expansion Styles</h3>
    <h4>None</h4>
    <vc-swipe-cell class="msg-swipe-cell" expansionStyle="none" transitionStyle="border">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn read" @click.native="log('msg-btn UnRead clicked')">UnRead</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h4>Selection</h4>
    <vc-swipe-cell class="msg-swipe-cell" expansionStyle="selection" transitionStyle="border">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn read" @click.native="log('msg-btn UnRead clicked')">UnRead</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h4>Destructive</h4>
    <vc-swipe-cell class="msg-swipe-cell" expansionStyle="destructive" transitionStyle="border">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">Delete</div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">Flag</div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">More</div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more">More</div>
        <div class="msg-btn flag">Flag</div>
        <div class="msg-btn delete">Delete</div>
      </template>
    </vc-swipe-cell>

    <h4>Customized</h4>
    <vc-swipe-cell class="msg-swipe-cell customized" expansionStyle="customized" transitionStyle="customized">
      <msg-content @click.native="log('cell body clicked')" />

      <template slot="btn-left">
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">
          <div>Delete</div>
        </div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">
          <div>Flag</div>
        </div>
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">
          <div>More</div>
        </div>
      </template>

      <template slot="btn-right">
        <div class="msg-btn more" @click.native="log('msg-btn more clicked')">
          <div>More</div>
        </div>
        <div class="msg-btn flag" @click.native="log('msg-btn flag clicked')">
          <div>Flag</div>
        </div>
        <div class="msg-btn delete" @click.native="log('msg-btn delete clicked')">
          <div>Delete</div>
        </div>
      </template>
    </vc-swipe-cell>
  </div>
</template>

<script>
import { VcSwipeCell } from 'vc-swipe-cell';
import MsgContent from '../components/msg-content';

import { transform } from 'util/dom';

const MIN_CUSTOMIZE_SCALE = 0.7;

export default {
  components: {
    MsgContent,
    VcSwipeCell
  },

  mounted() {
    this.$refs.swipeCell.expand('left');

    setTimeout(() => {
      this.$refs.swipeCell.unexpand();
    }, 1000);
  },

  methods: {
    log(str) {
      console.log(str);
    },
    borderLeftBtnClick() {
      this.$refs.borderSwipeCell.unexpand().then(() => {
        console.log('按钮点击了');
      });
    },

    onProgressChange(info) {
      const { btns, percent, btnsWidth, btnCanWidth, startVelocityX } = info;
      let btnMiddleOffset;
      let $btnStyle;
      let scale;

      if (Math.abs(startVelocityX) < 0.45) {
        // 慢速展开
        btns.forEach(($btn, i) => {
          $btnStyle = transform($btn);
          btnMiddleOffset =
            btnsWidth.slice(0, i).reduce((a, b) => a + b, 0) + btnsWidth[i] / 2;

          // 计算出按钮所处的状态
          if (percent > btnMiddleOffset / btnCanWidth) {
            $btnStyle.transform('scale(1)');
          } else {
            $btnStyle.transform(`scale(${MIN_CUSTOMIZE_SCALE})`);

            if (i === 0 && percent < 0.02) {
              $btnStyle.transitionDuration('0ms');
              return;
            }
          }

          $btnStyle.transitionDuration('280ms');
        });
      } else {
        // 快速展开
        btns.forEach($btn => {
          scale =
            percent * (1 - MIN_CUSTOMIZE_SCALE / 1.25) +
            MIN_CUSTOMIZE_SCALE / 1.25;
          $btnStyle = transform($btn);
          $btnStyle.transitionDuration('0ms');
          $btnStyle.transform(`scale(${scale})`);
        });
      }
    }
  }
};
</script>
