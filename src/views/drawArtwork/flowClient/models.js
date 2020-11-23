let uid = 1;

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
