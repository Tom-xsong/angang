import { Circle } from "zrender";
import {
  getId2element,
  getLineModelList,
  getRectModelList,
  getZR
} from "../render/render";
import { clearHandler } from "./controller";
import { emit } from "../event/index";

let isEdit = false;
let curRect;
let curLine;
let curType;

export function startEdit() {
  clearHandler();
  isEdit = true;
  const rectModelList = getRectModelList();
  const lineModeList = getLineModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    rectEdit(id2element[rectModel.id]);
  });
  lineModeList.forEach(lineModel => {
    lineEdit(id2element[lineModel.id]);
  });
}

export function endEdit() {
  if (!isEdit) return;
  isEdit = false;
  const rectModelList = getRectModelList();
  const lineModeList = getLineModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    id2element[rectModel.id].offEdit();
  });
  lineModeList.forEach(rectModel => {
    id2element[rectModel.id].offEdit();
  });
}

function rectEdit(rect) {
  rect.on("contextmenu", e => {
    curRect = rect;
    let node = makeRectMenu();
    node.style.left = e.offsetX + "px";
    node.style.top = e.offsetY + "px";
    let body = document.getElementById("artBody");
    body.appendChild(node);
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      window.event.returnValue = false;
    }
  });
  rect.offEdit = () => {
    rect.off("contextmenu");
  };
}

function lineEdit(line) {
  line.silent = false;
  line.on("contextmenu", e => {
    curLine = line;
    let node = makeLineMenu();
    node.style.left = e.offsetX + "px";
    node.style.top = e.offsetY + "px";
    let body = document.getElementById("artBody");
    body.appendChild(node);
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      window.event.returnValue = false;
    }
  });
  line.offEdit = () => {
    line.off("contextmenu");
  };
}

// 自定义菜单-矩形
function makeRectMenu() {
  var node = document.createElement("ol");
  node.classList.add("self-menu");
  let arr = ["修改样式", "删除"];
  for (let i in arr) {
    let oLi = document.createElement("li");
    oLi.classList.add("menu-item");
    oLi.onclick = [openModifyStyle, rectDel][i];
    oLi.innerHTML = arr[i];
    node.appendChild(oLi);
  }
  return node;
}

// 自定义菜单-线段
function makeLineMenu() {
  var node = document.createElement("ol");
  node.classList.add("self-menu");
  let arr = ["修改样式", "添加动画", "删除"];
  for (let i in arr) {
    let oLi = document.createElement("li");
    oLi.classList.add("menu-item");
    oLi.onclick = [openLineStyle, addAnimate, lineDel][i];
    oLi.innerHTML = arr[i];
    node.appendChild(oLi);
  }
  return node;
}

// 修改矩形样式
function openModifyStyle() {
  curType = "rect";
  let param = {
    type: "rect",
    style: curRect.style
  };
  emit("handleOpen", param);
  removeMenu();
}

// 修改矩形样式
function openLineStyle() {
  curType = "line";
  let param = {
    type: "line",
    style: curLine.style
  };
  emit("handleOpen", param);
  removeMenu();
}

// 修改样式确定
export function submitStyle(param, func) {
  let style = JSON.parse(JSON.stringify(param));
  if (curType === "rect") {
    curRect.attr({
      style: style
    });
    curRect.data.style = style;
  } else {
    curLine.attr({
      style: style
    });
    curLine.data.style = style;
    let trig = curLine.arrow;
    trig.attr({
      style: {
        fill: param.stroke
      }
    });
  }
  func();
}

// 删除矩形
function rectDel(e) {
  const zr = getZR();
  // 删除矩形
  zr.remove(curRect);
  const rectModelList = getRectModelList();
  for (let i = rectModelList.length - 1; i >= 0; i--) {
    if (rectModelList[i].id === curRect.data.id) {
      rectModelList.splice(i, 1);
      break;
    }
  }
  // 删除矩形相关的线段
  let relations = curRect.data.lineRelations;
  for (let i in relations) {
    const id2element = getId2element();
    let lines = id2element[relations[i].id];
    let trig = lines.arrow;
    zr.remove(lines);
    zr.remove(trig);
    const lineModeList = getLineModelList();
    for (let j = lineModeList.length - 1; j >= 0; j--) {
      if (lineModeList[j].id === relations[i].id) {
        lineModeList.splice(j, 1);
        break;
      }
    }
  }
  removeMenu();
  e.stopPropagation();
}

// 移除菜单
function removeMenu() {
  let body = document.getElementById("artBody");
  let node = document.getElementsByClassName("self-menu")[0];
  body.removeChild(node);
}

// 添加动画
function addAnimate() {
  let shape = curLine.shape;
  curLine.data.animate = true;
  circleAnimate(shape.points, curLine.style.stroke);
  removeMenu();
}

// 动画
function circleAnimate(polyline, color) {
  // 实心圆
  let cir = new Circle({
    shape: {
      cx: polyline[0][0],
      cy: polyline[0][1],
      r: 5
    },
    style: {
      fill: color
    }
  });
  const zr = getZR();
  zr.add(cir);
  const animation = cir.animate("shape", true);
  let delay = 0;
  for (let i = 1; i < polyline.length; i++) {
    const prev = polyline[i - 1];
    const cur = polyline[i];
    const distance = Math.sqrt(
      (prev[0] - cur[0]) ** 2 + (prev[1] - cur[1]) ** 2
    );
    delay += distance * 5;
    animation.when(delay, {
      cx: cur[0],
      cy: cur[1]
    });
  }
  animation.start();
}

// 删除线段
function lineDel() {
  const zr = getZR();
  let trig = curLine.arrow;
  zr.remove(curLine);
  zr.remove(trig);
  const lineModeList = getLineModelList();
  for (let j = lineModeList.length - 1; j >= 0; j--) {
    if (lineModeList[j].id === curLine.data.id) {
      lineModeList.splice(j, 1);
      break;
    }
  }
  removeMenu();
}
