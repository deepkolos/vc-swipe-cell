// 还是比较乱, 不够通用
import EventEmitter from 'events';

const _DEV = false;

export class State {
  constructor(id, data = {}, nextStates = {}) {
    this.id = id;
    this.data = data;
    this.nextStates = nextStates;
    this.nextStateIds = Object.keys(nextStates).map(i => ~~i);
  }
}

const JUMP_STATUS = ['', 'can', 'may', 'do', 'done', 'not do'];

// '' -> can -> may -> do     -> done
//                  -> not do -> ''
// 这个状态少了一个分支
// 在do ~ done/not do ~ init 阶段的新输入都会导致退回may阶段, 而不是直接cancel

export class StateMachine {
  constructor(initStateId, stateMapArr) {
    this.nextStateId;
    this.jumpStatus = 0;
    this.currStateId = initStateId;
    this.stateMapArr = stateMapArr;
    this.stateMap = stateMapArr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    this.currState = this.stateMap[this.currStateId];
    this.emitter = new EventEmitter();
    this.committingStateId;
  }

  destroy() {
    this.committingStateId = this.nextStateId = this.currState = this.currStateId = this.stateMapArr = this.stateMap = null;
    this.emitter.removeAllListeners();
  }

  onStateChange(cb) {
    this.emitter.on('stateChange', cb);
  }
  onceState(stateId, cb) {
    this.emitter.once('stateChange2' + stateId, cb);
  }

  getCurrState() {
    return this.currState;
  }
  getCurrStateId() {
    return this.currStateId;
  }

  getNextState() {
    if (this.stateMap) return this.stateMap[this.nextStateId];
  }
  getNextStateId() {
    return this.nextStateId;
  }

  getJumpStatus() {
    return this.jumpStatus;
  }

  setJumpStatus(nextJumpStatus) {
    this.jumpStatus = nextJumpStatus;
  }

  moveJumpStatus(nextJumpStatus, context) {
    // 中间的状态都会触发的一次的
    // 不过会标记为move的中间状态(TBD)
    // _DEV && console.log('test moveJumpStatus', nextJumpStatus);
    if (nextJumpStatus === this.jumpStatus) return;

    _DEV && console.log('moveJumpStatus', nextJumpStatus);

    if (nextJumpStatus === 3) {
      this.committingStateId = this.nextStateId;
    }

    this.jumpStatus = nextJumpStatus;
    const updateFn = this.currState.nextStates[this.nextStateId].update;

    updateFn && updateFn(JUMP_STATUS[this.jumpStatus], context, this);
  }

  moveState(nextStateId) {
    if (this.currStateId === nextStateId) return;

    this.nextStateId = nextStateId;
    this.moveJumpStatus(2);
    this.moveJumpStatus(3);

    return {
      then: cb => {
        if (cb) {
          this.onceState(nextStateId, cb);
        }
      }
    };
  }

  stateEach(cb) {
    cb && this.stateMapArr.forEach(cb);
  }

  testNextState(context) {
    this.stateMapArr.some(state => {
      return this.canJump(state.id, context);
    });
  }

  canJump(nextStateId, context) {
    const isCommitting = this.committingStateId !== undefined;
    const baseState = isCommitting
      ? this.stateMap[this.committingStateId]
      : this.currState;

    const inNextStateArr = baseState.nextStateIds.includes(nextStateId);

    if (inNextStateArr) {
      const testCan = baseState.nextStates[nextStateId].can;
      const matchCanJump =
        testCan instanceof Function ? testCan(context, this) : true;

      if (matchCanJump) {
        if (!isCommitting) {
          _DEV && console.log('nextStateId', nextStateId);
          this.nextStateId = nextStateId;
          this.moveJumpStatus(1, context);
          return true;
        } else {
          if (nextStateId === this.committingStateId) {
            const t = this.currStateId;
            this.currStateId = this.committingStateId;
            this.nextStateId = t;
            this.committingStateId = t;
            this.currState = this.stateMap[this.currStateId];
            this.moveJumpStatus(1, context);
            return true;
          }
        }
      }
    }

    return false;
  }

  mayJump(context) {
    if (this.jumpStatus === 0) return false;

    const testMay = this.currState.nextStates[this.nextStateId].may;
    const matchMayJump = testMay ? testMay(context, this) : true;

    this.moveJumpStatus(matchMayJump ? 2 : 1, context);

    return matchMayJump;
  }

  doJump(context) {
    if (this.jumpStatus === 2) {
      this.moveJumpStatus(3, context);
    } else if (this.jumpStatus !== 0) {
      this.moveJumpStatus(5, context);
    }
  }

  doneJump(context, force) {
    if (this.jumpStatus === 3 || force) {
      this.moveJumpStatus(4, context);
      const lastId = this.currStateId;
      this.jumpStatus = 0;
      this.currStateId = this.committingStateId;
      this.nextStateId = undefined;
      this.committingStateId = undefined;
      this.currState = this.stateMap[this.currStateId];

      this.emitter.emit('stateChange', this.currStateId, lastId);
      this.emitter.emit('stateChange2' + this.currStateId);
      _DEV && console.log('move to state ', this.currStateId);
    } else {
      // this.moveJumpStatus(0, context);
    }
  }

  doneNotJump(context) {
    if (this.jumpStatus === 5) {
      this.moveJumpStatus(0, context);

      _DEV && console.log('doneNotJump ', this.nextStateId);
      this.committingStateId = undefined;

      this.jumpStatus = 0;
      this.nextStateId = undefined;
    } else {
      // this.moveJumpStatus(0, context);
    }
  }

  cancelJump() {
    this.moveJumpStatus(0);
    this.jumpStatus = 0;
    this.nextStateId = undefined;
  }
}
