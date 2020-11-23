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
    color: "#999",
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
    color: "#999",
    trigId: "",
    lineRelations: []
  };
}
