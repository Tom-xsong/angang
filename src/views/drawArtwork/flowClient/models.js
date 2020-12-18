// 画矩形
export function makeRectModel(x, y, w, h,label) {
  return {
    id: "rect" + new Date().getTime(),
    code: "",
    equipmentType:"",
    text:"",
    type: "rect",
    label:label,
    shape: {
      x: ~~x + 0.5,
      y: ~~y + 0.5,
      width: w,
      height: h
    },
    style: {
      state:"stop",
      lineWidth: 2,
      stroke: "#00FF84",
      fill: "#002815",
      text: "",
      fontSize: 14,
      textFill: "#fff",
      textPosition: "inside"
    },
    zlevel: -100,
    lineRelations: [],
    
  };
  
}

// 画图片
export function makeImageModel(url, x, y, w, h,label) {
  return {
    id: "image" + new Date().getTime(),
    code: "",
    equipmentType:label,
    text:"",
    associatedCode:"",
    type: "image",
    label:label,
    state:"",
    style: {
      image: url,
      x: ~~x + 0.5,
      y: ~~y + 0.5,
      width: w,
      height: h,
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
    id: "cricle" + new Date().getTime(),
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
      fontSize: 14,
      textFill: "#fff"
    },
    lineRelations: []
  };
}

// 画线
export function makeLineModel(point) {
  return {
    id: "line" + new Date().getTime(),
    type: "line",
    shape: {
      points: point ? [point] : []
    },
    style: {
      lineWidth: 2,
      stroke: "#fff",
      text: "",
      fontSize: 14,
      textFill: "#fff"
    },
    lineRelations: [],
    animate: false
  };
}
