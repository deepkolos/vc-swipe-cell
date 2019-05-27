import mixState from 'mix/state';
import mixResize from 'mix/resize';
import swipeDirective from 'vue-swipe-directive';
import VelocityTracker from 'lib/velocity-tracker';

import { StateMachine, State } from 'lib/state-machine';
import { transform, tranX, tranX3D, rFA } from 'util/dom';

const MIN_DURATION = 200;
const MAX_LOG_INPUT = 1800;
const DEFAULT_DURATION = 280;
const MAX_OVERFLOW_OFFSET = 100;
const MAX_OVERFLOW_DURATION = 280;
// const OVERFLOW_RATIO = 288 / 3 / 360;
const TRANSITION_STYLE_OPTIONS = ['reveal', 'drag', 'border', 'customized'];
const EXPANSION_STYLE_OPTIONS = [
  'none',
  'selection',
  'destructive',
  'customized'
];

const collectChildWidth = node =>
  Array.prototype.map.call(
    node.children,
    $btn => $btn.getBoundingClientRect().width
  );

const restrictRange = (curr, min, max) => {
  return curr < min ? min : curr > max ? max : curr;
};

const fillPercent = percent => {
  if (percent > -0.009 && percent < 0.009) return 0;
  if (percent > 0.991 && percent < 1.009) return 1;
  return percent;
};

export default {
  name: 'vc-swipe-cell',

  props: {
    transitionStyle: {
      type: String,
      default: TRANSITION_STYLE_OPTIONS[0],
      validator: i => TRANSITION_STYLE_OPTIONS.includes(i)
    },
    expansionStyle: {
      type: String,
      default: EXPANSION_STYLE_OPTIONS[0],
      validator: i => EXPANSION_STYLE_OPTIONS.includes(i)
    },
    threshold: {
      type: Number,
      default: 0.2
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION
      // TODO: 变为参考值, 根据加速度去修正
    },
    btnCanBgColor: {
      type: String,
      default: ''
    },
    overflow: {
      type: Boolean,
      default: true
    },
    bodyScope: Object,
    btnScope: Object
  },

  /**
   * event: {
   *   progress-change()
   *   swipe-start()
   *   swipe-end()
   * }
   */

  mixins: [mixResize, mixState],

  directives: {
    swipe: swipeDirective
  },

  data() {
    return {
      jumpStatus: '',
      bodyWidth: 0,
      leftCanWidth: 0,
      rightCanWidth: 0,
      leftCanOffset: 0,
      rightCanOffset: 0
    };
  },

  computed: {
    isBorderTransition() {
      return this.transitionStyle === 'border';
    },
    isExpandable() {
      return ['selection', 'destructive'].includes(this.expand);
    },
    canExpandLeft() {
      return this.$refs.leftCan.children.length;
    },
    canExpandRight() {
      return this.$refs.rightCan.children.length;
    }
  },

  created() {
    this.swipeConf = {
      cancel: this.onSwipeCancel,
      start: this.onSwipeStart,
      move: this.onSwipeMove,
      end: this.onSwipeEnd
    };
  },

  mounted() {
    this.$bodyStyle = transform(this.$refs.body);
    this.$leftCanStyle = transform(this.$refs.leftCan);
    this.$rightCanStyle = transform(this.$refs.rightCan);

    this.updateSize();
    this.bodyOffsetCurr = 0;
    this.tracker = new VelocityTracker();
    this.bodyOffsetPredicted = () => {
      return restrictRange(
        this.bodyOffsetCurr + this.tracker.predictX(-0.003).s,
        this.swipeOffsetMin(),
        this.swipeOffsetMax()
      );
    };

    this.stepper = new StateMachine(0, [
      // new State(-2), // 用来做可滑动的二段溢出
      new State(
        -1,
        {
          action: 'expand',
          direction: 'left'
        },
        {
          0: {
            update: jumpStatus => {
              this.jumpStatus = `${jumpStatus}-unexpand-left`;

              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(this.leftCanWidth).then(() =>
                    this.stepper.doneNotJump()
                  );
                  break;
                case 'do':
                  this.bodyTranX(0).then(() => this.stepper.doneJump());
                  break;
              }
            },
            may: () =>
              1 - Math.abs(this.bodyOffsetPredicted()) / this.leftCanWidth >
              this.threshold,
            can: info => info.startWidthFour === 'left' && this.canExpandLeft
          },
          [-2]: {
            update: jumpStatus => {
              this.jumpStatus = `${jumpStatus}-expand-left`;

              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(this.leftCanWidth).then(() =>
                    this.stepper.doneNotJump()
                  );
                  break;
              }
            },
            may: () => false,
            can: info => info.startWidthFour === 'right' && this.canExpandLeft
          }
        }
      ),
      new State(
        0,
        {
          action: 'unexpand',
          direction: ''
        },
        {
          1: {
            update: jumpStatus => {
              this.jumpStatus = `${jumpStatus}-expand-right`;

              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(0).then(() => this.stepper.doneNotJump());
                  break;
                case 'do':
                  if (this.isExpandable && this.isReachExpansion()) {
                    // expandsion trigger
                    console.log('expandsion trigger');
                    this.bodyTranX(0).then(() => this.stepper.doneNotJump());
                  } else {
                    this.bodyTranX(-this.rightCanWidth).then(() =>
                      this.stepper.doneJump()
                    );
                  }
                  break;
              }
            },
            may: () =>
              Math.abs(this.bodyOffsetPredicted()) / this.rightCanWidth >
              this.threshold,
            can: info => info.startWidthFour === 'left' && this.canExpandRight
          },
          [-1]: {
            update: jumpStatus => {
              this.jumpStatus = `${jumpStatus}-expand-left`;

              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(0).then(() => this.stepper.doneNotJump());
                  break;
                case 'do':
                  if (this.isExpandable && this.isReachExpansion()) {
                    // expandsion trigger
                    console.log('expandsion trigger');
                    this.bodyTranX(0).then(() => this.stepper.doneNotJump());
                  } else {
                    this.bodyTranX(this.leftCanWidth).then(() =>
                      this.stepper.doneJump()
                    );
                  }
                  break;
              }
            },
            may: () =>
              Math.abs(this.bodyOffsetPredicted()) / this.leftCanWidth >
              this.threshold,
            can: info => info.startWidthFour === 'right' && this.canExpandLeft
          }
        }
      ),
      new State(
        1,
        {
          action: 'expand',
          direction: 'right'
        },
        {
          0: {
            update: jumpStatus => {
              this.jumpStatus = `${jumpStatus}-unexpand-right`;

              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(-this.rightCanWidth).then(() =>
                    this.stepper.doneNotJump()
                  );
                  break;
                case 'do':
                  this.bodyTranX(0).then(() => this.stepper.doneJump());
                  break;
              }
            },
            may: () =>
              1 - Math.abs(this.bodyOffsetPredicted()) / this.rightCanWidth >
              this.threshold,
            can: info => info.startWidthFour === 'right' && this.canExpandRight
          },
          [-2]: {
            update: jumpStatus => {
              switch (jumpStatus) {
                case 'not do':
                  this.bodyTranX(-this.rightCanWidth).then(() =>
                    this.stepper.doneNotJump()
                  );
                  break;
              }
            },
            may: () => false,
            can: info => info.startWidthFour === 'left' && this.canExpandRight
          }
        }
      )
    ]);
  },

  destroyed() {
    this.tracker.destroy();
    this.stepper.destroy();
  },

  methods: {
    // private method
    updateSize() {
      let bodyRect = this.$refs.body.getBoundingClientRect();
      let leftCanRect = this.$refs.leftCan.getBoundingClientRect();
      let rightCanRect = this.$refs.rightCan.getBoundingClientRect();

      this.bodyWidth = bodyRect.width;
      this.leftCanWidth = leftCanRect.width;
      this.rightCanWidth = rightCanRect.width;

      if (this.transitionStyle === 'drag') {
        this.leftCanOffset = -this.leftCanWidth;
        this.rightCanOffset = this.rightCanWidth;

        this.$leftCanStyle.transform(tranX(this.leftCanOffset));
        this.$rightCanStyle.transform(tranX(this.rightCanOffset));
      }

      if (
        this.transitionStyle === 'border' ||
        this.transitionStyle === 'customized'
      ) {
        this.leftCanBtnsWidth = collectChildWidth(this.$refs.leftCan);
        this.rightCanBtnsWidth = collectChildWidth(
          this.$refs.rightCan
        ).reverse();
      }

      if (this.transitionStyle === 'border') {
        this.$leftCanBtns = [...this.$refs.leftCan.children].map(
          ($btn, i, arr) => {
            $btn.style.zIndex = arr.length - i;
            return transform($btn);
          }
        );
        this.$rightCanBtns = [...this.$refs.rightCan.children]
          .map($btn => transform($btn))
          .reverse();
      }
    },

    injectApi(e) {
      e.vmSwipeCell = this;
    },

    swipeOffsetMin(withOverflow) {
      const state = this.stepper.getCurrStateId();
      const nextState = this.stepper.getNextStateId();
      // 向左展开 / 从左收缩
      if (
        (state === 0 && nextState === -1) ||
        (state === -1 && nextState === 0)
      ) {
        return 0;
      }
      // 向右展开 / 从右收缩
      if (
        (state === 0 && nextState === 1) ||
        (state === 1 && nextState === 0)
      ) {
        return !withOverflow && this.overflow
          ? -this.rightCanWidth
          : -this.rightCanWidth - MAX_OVERFLOW_OFFSET;
      }
    },
    swipeOffsetMax(withOverflow) {
      const state = this.stepper.getCurrStateId();
      const nextState = this.stepper.getNextStateId();
      // 向左展开 / 从左收缩
      if (
        (state === 0 && nextState === -1) ||
        (state === -1 && nextState === 0)
      ) {
        return !withOverflow && this.overflow
          ? this.leftCanWidth
          : this.leftCanWidth + MAX_OVERFLOW_OFFSET;
      }
      // 向右展开 / 从右收缩
      if (
        (state === 0 && nextState === 1) ||
        (state === 1 && nextState === 0)
      ) {
        return 0;
      }
    },
    swipeOffsetDelta(withOverflow) {
      return (
        this.swipeOffsetMax(withOverflow) - this.swipeOffsetMin(withOverflow)
      );
    },
    swipePercentMax() {
      return this.swipeOffsetDelta(true) / this.swipeOffsetDelta();
    },

    onSwipeStart(info) {
      this.tracker.clear();
      this.currAnimation &&
        !this.currAnimation.finished &&
        this.currAnimation.cancel();

      this.$bodyStyle.transitionDuration('0ms');
      this.$bodyStyle.transform(tranX(this.bodyOffsetCurr));

      switch (this.stepper.getJumpStatus()) {
        case 0:
          this.stepper.testNextState(info);
          // 这里swipe start的时候会拿不到的，感觉两个rFA有可能有问题
          rFA(() => {
            rFA(() => {
              this.startVelocityX = this.tracker.getXVelocity();
            });
          });
          break;
        case 3:
          this.stepper.testNextState(info);
          break;
        case 5:
          this.stepper.setJumpStatus(2);
          break;
      }

      this.bodyOffsetStart = this.bodyOffsetCurr;
      this.swipeOffsetStart = info.offset;

      this.$emit('swipe-start', this.getEmitInfo());
    },
    onSwipeMove(info) {
      this.tracker.addMovement({
        x: info.movingX,
        y: info.movingY
      });
      this.stepper.mayJump(info);

      if (this.stepper.getJumpStatus() === 0) return;

      let offset = info.offset - this.swipeOffsetStart + this.bodyOffsetStart;

      this.bodyOffsetCurr = offset = restrictRange(
        offset,
        this.swipeOffsetMin(true),
        this.swipeOffsetMax(true)
      );
      //  else {
      //   const minOffset = this.swipeOffsetMin();
      //   const maxOffset = this.swipeOffsetMax();
      //   this.bodyOffsetCurr = offset;

      //   if (offset < minOffset)
      //     this.bodyOffsetCurr = offset =
      //       minOffset + (offset - minOffset) * OVERFLOW_RATIO;

      //   if (offset > maxOffset)
      //     this.bodyOffsetCurr = offset =
      //       maxOffset + (offset - maxOffset) * OVERFLOW_RATIO;
      // }

      rFA(() => {
        this.emitProgressChange();
      });
      this.$bodyStyle.transform(tranX(offset));
    },
    onSwipeEnd() {
      this.stepper.doJump();
    },
    onSwipeCancel() {},
    onFlingEnd() {},
    onClick(e) {
      if (this.stepper.getCurrStateId() !== 0) {
        this.unexpand();
        e.stopPropagation();
      }

      if (this.stepper.getJumpStatus() !== 0) {
        e.stopPropagation();
      }
    },

    progressPrecent() {
      const nextState = this.stepper.getNextStateId();
      let percent = fillPercent(
        Math.abs(this.bodyOffsetCurr) /
          (this.swipeOffsetMax() - this.swipeOffsetMin())
      );

      if (nextState === 0) {
        return 1 - percent;
      }
      return percent;
    },
    isReachExpansion() {
      return (
        this.progressPrecent() >
        1 + ((3 / 4) * MAX_OVERFLOW_OFFSET) / this.swipeOffsetDelta()
      );
    },

    adjustDuration() {
      const predictX = this.tracker.predictX(-0.006);
      const remainDistance =
        (1 - this.progressPrecent()) * this.swipeOffsetDelta();
      let duration = this.duration;
      const { abs, max } = Math;

      if (abs(predictX.s) > abs(remainDistance)) {
        // props 的 duration 是作为参考值
        // TODO: 这里的duration调节需要优化, 触发 max 和 min 的情况太多
        duration =
          1.5 *
          predictX.t *
          (remainDistance / abs(predictX.s)) *
          max(this.duration / DEFAULT_DURATION, 1);

        return restrictRange(duration, MIN_DURATION, this.duration);
      }
      return duration;
    },
    bodyTranX(dst) {
      let thenCb;
      let src = this.bodyOffsetCurr;

      if (src === dst) {
        setTimeout(() => {
          thenCb && thenCb();
        });
      } else {
        const nextId = this.stepper.getNextStateId();
        const p = this.tracker.predictX(-0.005);
        let predictOffset = this.bodyOffsetCurr + p.s;
        const overflowed =
          nextId === 1
            ? predictOffset < dst
            : nextId === -1
            ? predictOffset > dst
            : false;

        const moveTo = () => {
          this.$bodyStyle.transitionDuration(this.adjustDuration() + 'ms');
          this.currAnimation = this.$bodyStyle
            .transform(tranX(dst))
            .then(() => {
              this.$bodyStyle.transitionDuration('0ms');
              this.bodyOffsetStart = this.bodyOffsetCurr = dst;
              thenCb && thenCb();
            })
            .during($el => {
              this.bodyOffsetCurr = $el.getBoundingClientRect().left;
              this.emitProgressChange();
            });
        };

        if (overflowed && this.overflow) {
          const flag = dst > 0 ? 1 : -1;
          const ADst = Math.abs(dst);
          const APredictOffset = Math.abs(predictOffset);
          const AOverflowOffset = restrictRange(
            APredictOffset - ADst + 1,
            Number.MIN_VALUE,
            MAX_LOG_INPUT
          );

          let predictDuration = restrictRange(
            p.t,
            MAX_OVERFLOW_DURATION / 1.5,
            MAX_OVERFLOW_DURATION
          );
          predictDuration =
            (predictDuration * this.duration) / DEFAULT_DURATION;
          predictOffset =
            dst +
            flag *
              Math.pow(AOverflowOffset / MAX_LOG_INPUT, 2) *
              MAX_OVERFLOW_OFFSET;

          this.$bodyStyle.transitionDuration(predictDuration + 'ms');
          this.currAnimation = this.$bodyStyle
            .transform(tranX(predictOffset))
            .then(moveTo)
            .during($el => {
              this.bodyOffsetCurr = $el.getBoundingClientRect().left;
              this.emitProgressChange();
            });
        } else {
          moveTo();
        }
      }

      return {
        then: cb => {
          thenCb = cb;
        }
      };
    },

    getBorderLeftBtnTranX(btnIndex, percent) {
      const startOffset = -this.leftCanBtnsWidth
        .slice(0, btnIndex + 1)
        .reduce((a, b) => a + b);
      return (0 - startOffset) * percent + startOffset;
    },
    getBorderRightBtnTranX(btnIndex, percent) {
      const startOffset = this.rightCanBtnsWidth
        .slice(0, btnIndex + 1)
        .reduce((a, b) => a + b);
      return (0 - startOffset) * percent + startOffset;
    },
    updateBorderTranX(info = {}) {
      const currState = info.currState.id;
      const nextState = (info.nextState || {}).id;
      if (nextState === undefined) return;
      let percent = info.percent;
      let transitionType = 'follow';
      const animate = duration => {
        if (currState === -1 || nextState === -1) {
          this.$leftCanBtns.forEach(($btnStyle, i) => {
            $btnStyle.transitionDuration(duration);
            $btnStyle.transform(
              tranX3D(this.getBorderLeftBtnTranX(i, percent))
            );
          });
        }

        if (currState === 1 || nextState === 1) {
          this.$rightCanBtns.forEach(($btnStyle, i) => {
            $btnStyle.transform(
              tranX3D(this.getBorderRightBtnTranX(i, percent))
            );
          });
        }
      };

      switch (this.expansionStyle) {
        case 'none':
          break;
        case 'selection':
          if (this.isReachExpansion()) {
            // 慢速推进
            transitionType = 'jump';
            percent = this.swipePercentMax();
          } else if (percent > 1) {
            percent = 1 + (percent - 1) / 3;
          }
          break;
        case 'destructive':
          break;
      }

      animate(transitionType === 'follow' ? '' : '280ms');
    },
    updateRevealTranX(info = {}) {
      const percent = info.percent;

      if (percent > 1) {
        switch (this.expansionStyle) {
          case 'none':
            // 跟随修正
            break;
          case 'selection':
            // 慢速推进

            if (this.isReachExpansion()) {
              // 立即跳转更新
            }
            break;
          case 'destructive':
            break;
        }
      }
    },
    updateDragTranX() {},

    getEmitInfo() {
      const currState = this.stepper.getCurrState();
      const nextState = this.stepper.getNextState();
      let percent = fillPercent(
        Math.abs(this.bodyOffsetCurr) /
          (this.swipeOffsetMax() - this.swipeOffsetMin())
      );

      if (!nextState) {
        return {
          percent,
          currState,
          vm: this,
          startVelocityX: this.startVelocityX
        };
      }

      let btns;
      let btnsWidth;
      let btnCanWidth;
      if (currState.id === -1 || nextState.id === -1) {
        btns = [...this.$refs.leftCan.children];
        btnsWidth = this.leftCanBtnsWidth;
        btnCanWidth = this.leftCanWidth;
      } else {
        btns = [...this.$refs.rightCan.children].reverse();
        btnsWidth = this.rightCanBtnsWidth;
        btnCanWidth = this.rightCanWidth;
      }

      return {
        btns,
        percent,
        btnsWidth,
        btnCanWidth,
        currState,
        nextState,
        vm: this,
        startVelocityX: this.startVelocityX
      };
    },
    emitProgressChange() {
      const info = this.getEmitInfo();

      switch (this.transitionStyle) {
        case 'reveal':
          this.updateRevealTranX(info);
          break;
        case 'drag':
          this.updateDragTranX(info);
          break;
        case 'border':
          this.updateBorderTranX(info);
          break;
      }

      this.$emit('progress-change', info);
    },

    // public method
    unexpand() {
      return this.stepper.moveState(0);
    },
    expand(left) {
      if (left === 'left') {
        return this.stepper.moveState(-1);
      } /* right */ else {
        return this.stepper.moveState(1);
      }
    },
    onceUnexpand(cb) {
      this.stepper.onceState(0, cb);
    }
  }
};
