import { init as initZR, Rect, Image, Polyline, Circle, Isogon,Text} from "zrender";
import {
  calcArrowCenter,
  makeRectVertexes,
  makeCircleVertexes
} from "../helpers";
import { resizeRect } from "../handler/resizeRect";
import { setCurVertexes } from "../handler/resizeRect";
import { circleAnimate } from "../handler/editAttr";

let zr = null;
let rectModelList = [];
let lineModelList = [];
let textModelList = [];
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

export function getTextModelList() {
  return textModelList;
}

export function initRender(el) {
  zr = initZR(el,{
    renderer:'canvas',       
    devicePixelRatio:1,      
    width:'1920px',           
    height:'1080px'           
}

);
  id2element = {};
}

// 添加图形
export function add(data) {
  switch (data.type) {
    case "rect":
      renderRect(data);
      break;
    case "image":
      renderImage(data);
      break;
    case "circle":
      renderCircle(data);
      break;
    case "line":
      renderLine(data);
      break;
    case "text":
      renderText(data)
  }
}

// 清除所有数据
export function clearAll() {
  zr.clear();
  rectModelList = [];
  lineModelList = [];
  textModelList = [];
  id2element = {};
}

// 绘制矩形
function renderRect(data) {
  const rect = new Rect({
    shape: data.shape,
    style: data.style,
    zlevel: data.z,
    data
  });
  zr.add(rect);
  rectModelList.push(data);
  id2element[data.id] = rect;
}

// 绘制图片
function renderImage(data) {
  const image = new Image({
    style: data.style,
    zlevel: 10,
    data
  });
  zr.add(image);
  rectModelList.push(data);
  id2element[data.id] = image;
}

// 绘制圆形
function renderCircle(data) {
  const circle = new Circle({
    shape: data.shape,
    style: data.style,
    zlevel: 10,
    data
  });
  zr.add(circle);
  rectModelList.push(data);
  id2element[data.id] = circle;
}

// 绘制线
export function renderLine(data, silent) {
  const polyline = new Polyline({
    shape: data.shape,
    style: data.style,
    zlevel: 5,
    data,
    silent
  });
  zr.add(polyline);
  lineModelList.push(data);
  id2element[data.id] = polyline;
  if (data.direction) {
    let length = data.shape.points.length;
    polyline.arrow = renderArrow(
      data.shape.points[length - 1],
      data.style.stroke,
      data.direction
    );
  }
  if (data.animate) {
    circleAnimate(polyline,data.shape.points, data.style.stroke);
  }
  return polyline;
}

// 方块顶点
export function renderRectVertexes(rect) {
  const zr = getZR();
  const curVertexes = [];
  let circleArr = [];
  let type = rect.data.type;
  if (type === "rect" || type === "image") {
    circleArr = makeRectVertexes(rect);
  } else {
    circleArr = makeCircleVertexes(rect);
  }
  circleArr.forEach((point, index) => {
    const circle = new Circle({
      shape: {
        cx: point[0],
        cy: point[1],
        r: 4
      },
      style: {
        fill: "#fff",
        stroke: "#999"
      },
      zlevel: 10,
      draggable: true
    });
    zr.add(circle);
    curVertexes.push(circle);
    resizeRect(type, circle, index);
  });
  setCurVertexes(curVertexes);
}

// 绘制三角形
export function renderArrow(point, color, direction) {
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
      fill: color,
      stroke: color,
      lineWidth: 1
    },
    zlevel: 10,
    rotation: Math.PI * rotation,
    origin: [x, y],
    direction
  });
  zr.add(triangle);
  return triangle;
}



//绘制文本
function renderText(data) {
  console.log("2332")
  const text = new Text({
    style: data.style,
    zlevel: 100,
    data
  });
  zr.add(text);
  textModelList.push(data);
  id2element[data.id] = text;
  console.log(textModelList,id2element)
}




