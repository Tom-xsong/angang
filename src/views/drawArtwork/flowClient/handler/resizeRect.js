import {
  makeRectVertexes,
  makeCircleVertexes,
  resetTransform
} from "../helpers";
import { lineFollowRect } from "./rectMove";
import {
  getId2element,
  getRectModelList,
  getZR,
  renderRectVertexes
} from "../render/render";
import { clearHandler } from "./controller";

let curRect;
let curVertexes = [];
let isRootTarget = true;

export function setCurVertexes(vertexes) {
  curVertexes = vertexes;
}

export function getCurVertexes() {
  return curVertexes;
}

let isRunning = false;

// 开启缩放状态
export function startResize() {
  clearHandler();
  isRunning = true;
  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    addHighlight(id2element[rectModel.id]);
  });

  const zr = getZR();
  zr.on("mousedown", mousedown);
}

// 结束缩放状态
export function endResize() {
  if (!isRunning) return;
  isRunning = false;
  const zr = getZR();
  zr.off("mousedown", mousedown);

  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    id2element[rectModel.id].offHighlight();
  });
  clearVertexes();
}

function mousedown() {
  if (isRootTarget) {
    curRect = null;
    clearVertexes();
  } else {
    isRootTarget = true;
  }
}

// 清除顶点
function clearVertexes() {
  const zr = getZR();
  curVertexes.forEach(circle => {
    zr.remove(circle);
    circle.offEvent();
  });
  curVertexes = [];
}

function addHighlight(rect) {
  function mousedown() {
    isRootTarget = false;
    if (curRect) {
      if (curRect === rect) return;
      clearVertexes();
    }
    curRect = rect;
    renderRectVertexes(rect);
  }

  rect.onHighlight = () => {
    rect.on("mousedown", mousedown);
  };

  rect.offHighlight = () => {
    rect.off("mousedown", mousedown);
  };

  rect.onHighlight();
}

export function resizeRect(type, circle, index) {
  let prevEvent;

  function dragstart(e) {
    isRootTarget = false;
    prevEvent = e;
  }
  function drag(e) {
    const offset = {
      x: e.offsetX - prevEvent.offsetX,
      y: e.offsetY - prevEvent.offsetY
    };
    prevEvent = e;
    if (type === "rect") {
      [
        resizeLT,
        resizeT,
        resizeRT,
        resizeR,
        resizeRB,
        resizeB,
        resizeLB,
        resizeL
      ][index](offset);
    } else {
      [resizeCT, resizeCR, resizeCB, resizeCL][index](offset);
    }
    vertexFollowRectResize(type);
    resetTransform(circle);
  }
  circle.on("dragstart", dragstart);
  circle.on("drag", drag);

  circle.offEvent = () => {
    circle.off("dragstart", dragstart);
    circle.off("drag", drag);
  };
}

function vertexFollowRectResize(type) {
  let circleArr = [];
  if (type === "rect") {
    circleArr = makeRectVertexes(curRect);
  } else {
    circleArr = makeCircleVertexes(curRect);
  }
  circleArr.forEach((point, index) => {
    curVertexes[index].setShape({
      cx: point[0],
      cy: point[1]
    });
  });
}

// 左上
function resizeLT(offset) {
  const shape = curRect.shape;
  shape.x += offset.x;
  shape.y += offset.y;
  shape.width -= offset.x * 2;
  shape.height -= offset.y;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
      });
    } else {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? -offset.x : offset.x,
        y: 0
      });
    }
  });
}

// 上
function resizeT(offset) {
  const shape = curRect.shape;
  shape.y += offset.y;
  shape.height -= offset.y * 2;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? -offset.y : offset.y
      });
    }
  });
}

// 右上
function resizeRT(offset) {
  const shape = curRect.shape;
  shape.x -= offset.x;
  shape.width += offset.x * 2;
  shape.y += offset.y;
  shape.height -= offset.y;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
      });
    } else {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? offset.x : -offset.x,
        y: 0
      });
    }
  });
}

// 右
function resizeR(offset) {
  const shape = curRect.shape;
  shape.x -= offset.x;
  shape.width += offset.x * 2;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (!line.isStartVertical && !line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? offset.x : -offset.x,
        y: 0
      });
    }
  });
}

// 右下
function resizeRB(offset) {
  const shape = curRect.shape;
  shape.x -= offset.x;
  shape.width += offset.x * 2;
  shape.height += offset.y;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
      });
    } else {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? offset.x : -offset.x,
        y: lineRelation.isRight ? offset.y : 0
      });
    }
  });
}

// 下
function resizeB(offset) {
  const shape = curRect.shape;
  shape.y -= offset.y;
  shape.height += offset.y * 2;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : -offset.y
      });
    }
  });
}

// 左下
function resizeLB(offset) {
  const shape = curRect.shape;
  shape.x += offset.x;
  shape.width -= offset.x * 2;
  shape.height += offset.y;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (line.isStartVertical || line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
      });
    } else {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? -offset.x : offset.x,
        y: lineRelation.isRight ? offset.y : 0
      });
    }
  });
}

// 左
function resizeL(offset) {
  const shape = curRect.shape;
  shape.x += offset.x;
  shape.width -= offset.x * 2;
  curRect.setShape(shape);

  const id2element = getId2element();

  curRect.data.lineRelations.forEach(lineRelation => {
    const line = id2element[lineRelation.id];
    if (!line.isStartVertical && !line.isEndVertical) {
      lineFollowRect(lineRelation, {
        x: lineRelation.isRight ? -offset.x : offset.x,
        y: 0
      });
    }
  });
}

// 圆形整理
// 上
function resizeCT(offset) {
  const shape = curRect.shape;
  shape.r -= offset.y;
  curRect.setShape(shape);
}

// 右
function resizeCR(offset) {
  const shape = curRect.shape;
  shape.r += offset.x;
  curRect.setShape(shape);
}

// 下
function resizeCB(offset) {
  const shape = curRect.shape;
  shape.r += offset.y;
  curRect.setShape(shape);
}

// 左
function resizeCL(offset) {
  const shape = curRect.shape;
  shape.r -= offset.x;
  curRect.setShape(shape);
}
