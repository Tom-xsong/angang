import {
  getId2element,
  getRectModelList,
  getZR,
  renderLine,
  renderArrow
} from "../render/render";
import { makeLineModel } from "../models";
import { clearHandler } from "./controller";

let curDrawLine;
let isVertical;
let isNewPoint = true;
let isClickRoot = false;

let isRunning = false;
// 开启画线状态
export function startDrawLine() {
  clearHandler();
  isRunning = true;
  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    addDrawLine(id2element[rectModel.id]);
  });

  getZR().on("mousemove", mousemove);
  getZR().on("click", clickRoot);
}

// 结束画线状态
export function endDrawLine() {
  if (!isRunning) return;
  isRunning = false;
  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    id2element[rectModel.id].offDrawLine();
  });
  getZR().off("mousemove", mousemove);
  getZR().off("click", clickRoot);
}

// 鼠标移动绘制线段
function mousemove(e) {
  if (!curDrawLine) return;
  const points = curDrawLine.shape.points;
  if (isNewPoint) {
    isNewPoint = false;
    points.push([~~e.offsetX + 0.5, ~~e.offsetY + 0.5]);
  } else {
    const last = points[points.length - 2];
    isVertical = Math.abs(e.offsetY - last[1]) > Math.abs(e.offsetX - last[0]);
    points[points.length - 1] = isVertical
      ? [last[0], ~~e.offsetY + 0.5]
      : [~~e.offsetX + 0.5, last[1]];
  }
  curDrawLine.setShape({
    points
  });
}

function clickRoot() {
  if (isClickRoot) {
    isNewPoint = true;
  }
  isClickRoot = true;
}

function addDrawLine(rect) {
  function click(e) {
    isClickRoot = false;

    if (curDrawLine) {
      clickToEnd(rect);
    } else {
      clickToStart(e, rect);
    }
  }

  rect.on("click", click);
  rect.offDrawLine = () => {
    rect.off("click", click);
  };
}

// 开始画线
function clickToStart(e, rect) {
  const x = ~~e.offsetX + 0.5;
  const y = ~~e.offsetY + 0.5;
  const near = [
    {
      isRight: false,
      value: x - rect.shape.x,
      point: [rect.shape.x, y]
    },
    {
      isRight: true,
      value: rect.shape.x + rect.shape.width - x,
      point: [rect.shape.x + rect.shape.width, y]
    },
    {
      isBottom: false,
      value: y - rect.shape.y,
      point: [x, rect.shape.y]
    },
    {
      isBottom: true,
      value: rect.shape.y + rect.shape.height - y,
      point: [x, rect.shape.y + rect.shape.height]
    }
  ];
  const min = Math.min(...near.map(d => d.value));
  const nearInfo = near.find(d => d.value === min);
  const point = nearInfo.point;

  const data = makeLineModel(point);
  curDrawLine = renderLine(data, true);
  rect.data.lineRelations.push({
    id: data.id,
    isStart: true,
    isBottom: nearInfo.isBottom,
    isRight: nearInfo.isRight
  });
  isNewPoint = true;
}

// 结束画线
function clickToEnd(rect) {
  const points = curDrawLine.shape.points;
  const last = points[points.length - 2];
  let point;
  let isBottom = false;
  let isRight = false;
  let arrowDirection;
  if (isVertical) {
    point = [last[0], rect.shape.y];
    arrowDirection = "B";
    if (last[1] > rect.shape.y) {
      isBottom = true;
      arrowDirection = "T";
      point[1] += rect.shape.height;
    }
  } else {
    point = [rect.shape.x, last[1]];
    arrowDirection = "R";
    if (last[0] > rect.shape.x) {
      isRight = true;
      arrowDirection = "L";
      point[0] += rect.shape.width;
    }
  }
  points[points.length - 1] = point;
  curDrawLine.setShape({
    points
  });
  rect.data.lineRelations.push({
    id: curDrawLine.data.id,
    isStart: false,
    isBottom: isBottom,
    isRight: isRight
  });
  curDrawLine.data.direction = arrowDirection;
  curDrawLine.isStartVertical = points[0][1] !== points[1][1];
  curDrawLine.isEndVertical = isVertical;

  curDrawLine.arrow = renderArrow(
    point,
    curDrawLine.style.stroke,
    arrowDirection
  );
  curDrawLine = null;
}
