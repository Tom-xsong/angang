let uid = 1;

// 画矩形
export function makeRectModel(x, y) {
  return {
    id: uid++,
    type: "rect",
    shape: {
      x: ~~x + 0.5,
      y: ~~y + 0.5,
      width: 200,
      height: 100
    },
    style: {
      lineWidth: 1,
      stroke: "#999",
      fill: "#fff",
      text: "",
      fontSize: 16,
      textFill: "#999"
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
      stroke: "#999",
      fill: "#fff",
      text: "",
      fontSize: 16,
      textFill: "#999"
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
      lineWidth: 1,
      stroke: "#999",
      text: "",
      fontSize: 16,
      textFill: "#999"
    },
    lineRelations: [],
    animate: false
  };
}
