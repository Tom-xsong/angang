import {
  makeLineModel,
  makeRectModel,
  makeImageModel,
  makeCircleModel,
  makeBorderRectModel,
  makeTextModel
} from "./models";
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
    const obj = addModel();
    let data;
    switch (obj.type) {
      case "rect":

        if(obj.label == "矩形"){
          data = makeRectModel(e.offsetX, e.offsetY, obj.width, obj.height,obj.label);
        }
        else if(obj.label == "虚线框"){
          data = makeBorderRectModel(e.offsetX, e.offsetY, obj.width, obj.height,obj.label);
        }
       
        break;
      case "image":
        data = makeImageModel(
          obj.image,
          e.offsetX,
          e.offsetY,
          obj.width,
          obj.height,
          obj.label
        );
        break;
      case "circle":
        data = makeCircleModel(e.offsetX, e.offsetY);
        break;
      case "line":
        data = makeLineModel(e.offsetX, e.offsetY);
        break;

      case "text":
        data=  makeTextModel(
          e.offsetX,
          e.offsetY,
          obj.width,
          obj.height,
          obj.label
          );
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
