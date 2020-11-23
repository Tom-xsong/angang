const eventPool = {};

// 定义事件
export function on(type, fn) {
  if (!eventPool[type]) {
    eventPool[type] = [];
  }
  eventPool[type].push(fn);
}

// 销毁事件
export function off(type, fn) {
  const index = eventPool[type].findIndex(d => d === fn);
  eventPool[type].splice(index, 1);
  if (!eventPool[type].length) {
    delete eventPool[type];
  }
}

// 触发事件
export function emit(type, args) {
  eventPool[type].forEach(fn => {
    fn(args);
  });
}
