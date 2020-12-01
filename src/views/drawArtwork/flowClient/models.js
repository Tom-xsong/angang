let uid = 1;

// 画矩形
export function makeRectModel(x, y, w, h) {
  return {
    id: uid++,
    type: "rect",
    shape: {
      x: ~~x + 0.5,
      y: ~~y + 0.5,
      width: w / 2,
      height: h / 2
    },
    style: {
      lineWidth: 2,
      stroke: "#00FF84",
      fill: "#002815",
      text: "",
      fontSize: 14,
      textFill: "#fff",
      textPosition: "inside"
    },
    lineRelations: []
  };
}

// 画图片
export function makeImageModel(url, x, y, w, h) {
  return {
    id: uid++,
    type: "image",
    style: {
      image: url,
      x: ~~x + 0.5,
      y: ~~y + 0.5,
      width: w / 2,
      height: h / 2,
      text: "",
      fontSize: 14,
      textFill: "#fff",
      textPosition: "top"
    },
    lineRelations: []
  };
}

// 画圆形
export function makeCircleModel(x, y) {
  return {
    id: uid++,
    type: "circle",
    shape: {
      cx: x,
      cy: y,
      r: 25
    },
    style: {
      lineWidth: 1,
      stroke: "#fff",
      fill: "#fff",
      text: "",
      fontSize: 16,
      textFill: "#fff"
    },
    lineRelations: []
  };
}

// 画线
export function makeLineModel(point) {
  return {
    id: uid++,
    type: "line",
    shape: {
      points: point ? [point] : []
    },
    style: {
      lineWidth: 2,
      stroke: "#fff",
      text: "",
      fontSize: 16,
      textFill: "#fff"
    },
    lineRelations: [],
    animate: false
  };
}
