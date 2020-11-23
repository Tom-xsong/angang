import { init as initZR, Rect, Polyline, Circle, Isogon } from "zrender";
import { calcArrowCenter, makeRectVertexes } from "../helpers";
import { resizeRect } from "../handler/resizeRect";
import { setCurVertexes } from "../handler/resizeRect";

let zr = null;
let rectModelList = [];
let lineModelList = [];
let id2element = {};

export function getZR() {
  return zr;
}

export function getId2element() {
  return id2element;
}

export function getRectModelList() {
  return rectModelList;
}
export function getLineModelList() {
  return lineModelList;
}

export function initRender(el) {
  zr = initZR(el);
  id2element = {};
}

export function add(data) {
  switch (data.type) {
    case "rect":
      renderRect(data);
      break;
    case "line":
      renderLine(data);
      break;
  }
}

export function clearAll() {
  zr.clear();
  rectModelList = [];
  lineModelList = [];
  id2element = {};
}

// 绘制矩形
function renderRect(data) {
  const rect = new Rect({
    shape: data.shape,
    style: {
      fill: "#fff",
      stroke: data.color,
      lineWidth: 1,
      text: "",
      fontSize: 16,
      textFill: data.color
    },
    data
  });
  zr.add(rect);
  rectModelList.push(data);
  id2element[data.id] = rect;
}

// 绘制线
export function renderLine(data, silent) {
  const polyline = new Polyline({
    shape: data.shape,
    style: {
      stroke: data.color,
      lineWidth: 1,
      text: "",
      fontSize: 16,
      textFill: data.color
    },
    data,
    silent
  });
  zr.add(polyline);
  lineModelList.push(data);
  id2element[data.id] = polyline;
  return polyline;
}

// 方块顶点
export function renderRectVertexes(rect) {
  const zr = getZR();
  const curVertexes = [];
  makeRectVertexes(rect).forEach((point, index) => {
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
    resizeRect(circle, index);
  });
  setCurVertexes(curVertexes);
}

// 绘制三角形
export function renderArrow(point, direction) {
  let rotation = 0;
  let [x, y] = calcArrowCenter(point, direction);
  switch (direction) {
    case "T":
      break;
    case "R":
      rotation = -0.5;
      break;
    case "B":
      rotation = 1;
      break;
    case "L":
      rotation = 0.5;
      break;
  }
  const triangle = new Isogon({
    shape: {
      x: x,
      y: y,
      r: 6,
      n: 3
    },
    style: {
      fill: "#999",
      stroke: 1
    },
    rotation: Math.PI * rotation,
    origin: [x, y],
    direction
  });
  zr.add(triangle);
  return triangle;
}
