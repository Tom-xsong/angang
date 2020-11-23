import { init, Rect, Polyline, Circle, Isogon } from "zrender";

let zr = null;

let zrData = [];
// id 索引
const idMap = {};

let curRect;
let curVertexes = [];
// 是否点击画布空区域 用于清除当前高亮的元素
let isRootTarget = true;
// 是否处于绘制线段阶段
let isDrawLine = false;
let currentLineId = "";
let timer;
let moveStart = {
  x: 0,
  y: 0
};

// 初始化
export function initDom(dom) {
  zr = init(dom);
  zr.on("mousedown", () => {
    if (isRootTarget) {
      setCurElement();
    } else {
      isRootTarget = true;
    }
  });
  // 开始绘制线段
  zr.on("click", () => {
    if (isDrawLine) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let line = idMap[currentLineId];
        let shape = line.shape;
        let points = shape.points;
        let length = points.length;
        points.push([points[length - 1][0], points[length - 1][1]]);
        line.setShape({
          points
        });
      }, 100);
    }
  });
  // 绘制线段中
  zr.on("mousemove", e => {
    if (isDrawLine) {
      handleMove(e);
    }
  });
  // 结束绘制
  zr.on("dblclick", () => {
    if (isDrawLine) {
      clearTimeout(timer);
      handleDbclick();
    }
  });
}

// 绘制图形
export function drawArt(item) {
  zrData.push(item);
  switch (item.type) {
    case "rect":
      renderRect(item);
      break;
    case "line":
      renderLine(item);
      break;
  }
}

// 清空画布
export function clearAll() {
  zrData = [];
  zr.clear();
}

// 开始绘制线段
export function drawLineState(b) {
  console.log(b);
  // isDrawLine = b;
}

function setCurElement(element) {
  curVertexes.forEach(circle => {
    zr.remove(circle);
    circle.off("dragstart", circle.dragstart);
    circle.off("drag", circle.drag);
    circle.off("click", circle.click);
  });
  curVertexes = [];
  curRect = element;
}

// 绘制矩形
function renderRect(data) {
  const rect = new Rect({
    shape: data.shape,
    style: {
      fill: "#fff",
      stroke: data.color,
      text: data.text,
      fontSize: 18,
      textFill: data.color
    },
    draggable: true,
    data
  });
  zr.add(rect);
  idMap[data.id] = rect;

  let prevEvent;
  rect.on("dragstart", e => {
    if (isDrawLine) return;
    isRootTarget = false;
    prevEvent = e;
    moveStart.x = e.offsetX;
    moveStart.y = e.offsetY;
    if (curRect === rect) return;
    setCurElement(rect);
    renderRectVertexes(rect);
  });
  rect.on("drag", e => {
    if (isDrawLine) return;
    const offset = {
      x: e.offsetX - prevEvent.offsetX,
      y: e.offsetY - prevEvent.offsetY
    };
    prevEvent = e;
    data.lineRelations.forEach(lineRelation => {
      lineFollowRect(lineRelation, offset);
    });
    curVertexes.forEach(vertex => {
      vertexFollowRectDrag(vertex, offset);
    });
  });

  rect.on("dragend", () => {
    if (isDrawLine) return;
    moveStart.x = 0;
    moveStart.y = 0;
    const shape = rect.shape;
    shape.x += rect.position[0];
    shape.y += rect.position[1];
    rect.setShape(shape);
    resetTransform(rect);
  });
}

// 绘制线段
function renderLine(data) {
  const polyline = new Polyline({
    shape: data.shape,
    style: {
      stroke: data.color
    },
    data
  });
  zr.add(polyline);
  idMap[data.id] = polyline;
}

// 移动鼠标, 绘制线段
function handleMove(e) {
  let line = idMap[currentLineId];
  let points = line.shape.points;
  let length = points.length;
  let left = e.offsetX;
  let top = e.offsetY;
  let stick = "";
  let i = length > 1 ? length - 2 : length - 1;
  let x = Math.abs(left - points[i][0]);
  let y = Math.abs(top - points[i][1]);
  let angle = (350 * Math.atan(y / x)) / (2 * Math.PI);
  if (left - points[i][0] >= 0) {
    if (top - points[i][1] <= 0) {
      if (angle >= 45) {
        stick = "t";
      } else {
        stick = "r";
      }
    } else {
      if (angle >= 45) {
        stick = "b";
      } else {
        stick = "r";
      }
    }
  } else {
    if (top - points[length - 1][1] <= 0) {
      if (angle >= 45) {
        stick = "t";
      } else {
        stick = "l";
      }
    } else {
      if (angle >= 45) {
        stick = "b";
      } else {
        stick = "l";
      }
    }
  }
  line.data.direct = stick;
  switch (stick) {
    // 上
    case "t":
      points[length - 1][1] = top;
      break;
    // 右
    case "r":
      points[length - 1][0] = left;
      break;
    // 下
    case "b":
      points[length - 1][1] = top;
      break;
    // 左
    case "l":
      points[length - 1][0] = left;
      break;
  }
  line.setShape({
    points
  });
}
// 双击鼠标
function handleDbclick() {
  isDrawLine = false;
  let line = idMap[currentLineId];
  let points = line.shape.points;
  let length = points.length;
  points.splice(length - 1, 1);
  length = points.length;
  let x = points[length - 1][0];
  let y = points[length - 1][1];
  let trigData = {
    id: "triangle" + new Date().getTime(),
    direct: line.data.direct,
    shape: {
      x: x,
      y: y,
      r: 10,
      n: 3
    },
    color: line.data.color
  };
  drawTriangle(line, trigData);
  console.log(zrData);
  let isV = false;
  if (line.data.direct === "t" || line.data.direct === "b") {
    isV = true;
  }
  // 寻找跟线段关联的矩形
  let idArr = Object.values(idMap);
  for (let i in idArr) {
    if (
      idArr[i].type === "rect" &&
      idArr[i].contain(points[length - 1][0], points[length - 1][1])
    ) {
      idArr[i].data.lineRelations.push({
        id: currentLineId,
        isStart: false,
        isVertical: isV,
        isBottom: true
      });
    }
  }
}

// 绘制三角形
function drawTriangle(line, data) {
  // 三角形
  let rotate = 0;
  switch (data.direct) {
    case "t":
      data.shape.y -= 10;
      break;
    case "b":
      data.shape.y += 10;
      rotate = 1;
      break;
    case "l":
      data.shape.x += 10;
      rotate = 1.5;
      break;
    case "r":
      data.shape.x -= 10;
      rotate = 0.5;
      break;
  }
  let triangle = new Isogon({
    rotation: rotate,
    origin: [data.shape.x, data.shape.y],
    shape: data.shape,
    style: {
      fill: data.color
    },
    data
  });
  line.data.trigId = data.id;
  zr.add(triangle);
  idMap[data.id] = triangle;
}

// 线跟随拖动
function lineFollowRect(lineRelation, offset) {
  const line = idMap[lineRelation.id];
  const points = line.shape.points;
  let lastIndex = points.length - 1;
  if (lineRelation.isVertical) {
    // 垂直
    if (lineRelation.isStart) {
      points[0][0] += offset.x;
      points[0][1] += offset.y;
      // 线段只有两个点移动位置超过矩形高度,线段转折
      if (lastIndex === 1 && Math.abs(points[0][0] - moveStart.x) > 0) {
        let halfY = (points[1][1] - points[0][1]) / 2;
        points.splice(
          1,
          0,
          [points[0][0], points[0][1] + halfY],
          [points[1][0], points[0][1] + halfY]
        );
      } else {
        points[1][0] = points[0][0];
      }
    } else {
      points[lastIndex][0] += offset.x;
      points[lastIndex][1] += offset.y;
      // 线段只有两个点移动位置超过矩形高度,线段转折
      if (lastIndex === 1 && Math.abs(points[lastIndex][0] - moveStart.x) > 0) {
        let halfY = (points[lastIndex][1] - points[lastIndex - 1][1]) / 2;
        points.splice(
          lastIndex,
          0,
          [points[lastIndex - 1][0], points[lastIndex - 1][1] + halfY],
          [points[lastIndex][0], points[lastIndex - 1][1] + halfY]
        );
      } else {
        points[lastIndex - 1][0] = points[lastIndex][0];
      }
    }
    // 箭头跟着移动
    let trig = idMap[line.data.trigId];
    let shape = trig.shape;
    shape.x = points[lastIndex][0];
    if (trig.data.direct === "t") {
      shape.y = points[lastIndex][1] + 10;
    } else {
      shape.y = points[lastIndex][1] - 10;
    }
    trig.setShape(shape);
    trig.attr("origin", [shape.x, shape.y]);
  } else {
    // 水平
    if (lineRelation.isStart) {
      points[0][0] += offset.x;
      points[0][1] += offset.y;
      // 线段只有两个点移动位置超过矩形高度,线段转折
      if (lastIndex === 1 && Math.abs(points[0][1] - moveStart.y) > 0) {
        let halfX = (points[1][0] - points[0][0]) / 2;
        points.splice(
          1,
          0,
          [points[0][0] + halfX, points[0][1]],
          [points[0][0] + halfX, points[1][1]]
        );
      } else {
        points[1][1] = points[0][1];
      }
    } else {
      points[lastIndex][0] += offset.x;
      points[lastIndex][1] += offset.y;
      // 线段只有两个点移动位置超过矩形高度,线段转折
      if (lastIndex === 1 && Math.abs(points[lastIndex][1] - moveStart.y) > 0) {
        let halfX = (points[lastIndex][0] - points[lastIndex - 1][0]) / 2;
        points.splice(
          lastIndex,
          0,
          [points[lastIndex - 1][0] + halfX, points[lastIndex - 1][1]],
          [points[lastIndex - 1][0] + halfX, points[lastIndex][1]]
        );
      } else {
        points[lastIndex - 1][1] = points[lastIndex][1];
      }
    }
    // 箭头跟着移动
    let trig = idMap[line.data.trigId];
    let shape = trig.shape;
    if (trig.data.direct === "r") {
      shape.x = points[lastIndex][0] - 10;
    } else {
      shape.x = points[lastIndex][0] + 10;
    }
    shape.y = points[lastIndex][1];
    trig.setShape(shape);
    trig.attr("origin", [shape.x, shape.y]);
  }
  line.setShape({
    points
  });
}

// 顶点跟随拖动
function vertexFollowRectDrag(circle, offset) {
  const shape = circle.shape;
  shape.cx += offset.x;
  shape.cy += offset.y;
  circle.setShape(shape);
}

// 绘制顶点-调整器圆圈
function renderRectVertexes(rect) {
  const shape = rect.shape;
  const halfW = shape.width / 2;
  const halfH = shape.height / 2;
  [
    [shape.x, shape.y],
    [shape.x + halfW, shape.y],
    [shape.x + shape.width, shape.y],
    [shape.x + shape.width, shape.y + halfH],
    [shape.x + shape.width, shape.y + shape.height],
    [shape.x + halfW, shape.y + shape.height],
    [shape.x, shape.y + shape.height],
    [shape.x, shape.y + halfH]
  ].forEach((point, index) => {
    const circle = new Circle({
      shape: {
        cx: point[0],
        cy: point[1],
        r: 4
      },
      style: {
        fill: "#fff",
        stroke: 1
      },
      draggable: true
    });
    zr.add(circle);
    curVertexes.push(circle);

    // 顶点拖拽
    let prevEvent;

    circle.dragstart = e => {
      isRootTarget = false;
      prevEvent = e;
    };
    circle.drag = e => {
      if (isDrawLine) return;
      const offset = {
        x: e.offsetX - prevEvent.offsetX,
        y: e.offsetY - prevEvent.offsetY
      };
      prevEvent = e;
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
      vertexFollowRectResize(index);
      resetTransform(circle);
    };
    circle.click = () => {
      // 点击四个方向的圆角开始绘制线段
      isDrawLine = true;
      if (index % 2 !== 0) {
        let x = point[0];
        let y = point[1];
        currentLineId = "line" + new Date().getTime();
        let lineData = {
          type: "line",
          id: currentLineId,
          shape: {
            points: [[x, y]]
          },
          color: "#999",
          direct: "",
          trigId: ""
        };
        let isV = false;
        if (index === 1 || index === 5) {
          isV = true;
        }
        rect.data.lineRelations.push({
          id: currentLineId,
          isStart: true,
          isVertical: isV,
          isBottom: false
        });
        drawArt(lineData);
      }
    };
    circle.on("dragstart", circle.dragstart);
    circle.on("drag", circle.drag);
    circle.on("click", circle.click);
  });
}

// 调整矩形大小
function vertexFollowRectResize() {
  const shape = curRect.shape;
  const halfW = shape.width / 2;
  const halfH = shape.height / 2;
  [
    [shape.x, shape.y],
    [shape.x + halfW, shape.y],
    [shape.x + shape.width, shape.y],
    [shape.x + shape.width, shape.y + halfH],
    [shape.x + shape.width, shape.y + shape.height],
    [shape.x + halfW, shape.y + shape.height],
    [shape.x, shape.y + shape.height],
    [shape.x, shape.y + halfH]
  ].forEach((point, index) => {
    // if (excludeIndex === index) return;
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

  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
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
  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
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

  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? 0 : offset.y
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
}

// 右下
function resizeRB(offset) {
  const shape = curRect.shape;
  shape.x -= offset.x;
  shape.width += offset.x * 2;
  shape.height += offset.y;
  curRect.setShape(shape);

  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
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
  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
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

  curRect.data.lineRelations.forEach(lineRelation => {
    if (lineRelation.isVertical) {
      lineFollowRect(lineRelation, {
        x: 0,
        y: lineRelation.isBottom ? offset.y : 0
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
}

// 重置transform
function resetTransform(element, offset = 0) {
  element.transform = [1, 0, 0, 1, offset, 0];
  element.invTransform = [1, -0, -0, 1, -offset, -0];
  element.decomposeTransform();
}
