import { makeLineModel, makeRectModel, makeCircleModel } from "./models";
import { add, initRender } from "./render/render";
import { clearHandler } from "./handler/controller";
export function init(el, { addModel }) {
  initRender(el);
  el.addEventListener("dragover", dragover);
  el.addEventListener("drop", drop);
  function dragover(e) {
    e.preventDefault();
  }
  function drop(e) {
    clearHandler();
    const type = addModel();
    let data;
    switch (type) {
      case "rect":
        data = makeRectModel(e.offsetX, e.offsetY);
        break;
      case "circle":
        data = makeCircleModel(e.offsetX, e.offsetY);
        break;
      case "line":
        data = makeLineModel(e.offsetX, e.offsetY);
        break;
    }
    add(data);
  }
}

// 各个状态的开启和结束
export { startDrawLine, endDrawLine } from "./handler/drawLine";
export { startResize, endResize } from "./handler/resizeRect";
export { startRectMove, endRectMove } from "./handler/rectMove";
export { startEdit, endEdit, submitStyle } from "./handler/editAttr";
