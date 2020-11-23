import {
  getId2element,
  getLineModelList,
  getRectModelList,
  getZR
} from "../render/render";
import { clearHandler } from "./controller";

let isEdit = false;
let curRect;
let curLine;

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
  line.on("contextmenu", e => {
    if (curLine === line) return;
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
  let arr = ["删除", "修改颜色", "添加文字"];
  for (let i in arr) {
    let oLi = document.createElement("li");
    oLi.classList.add("menu-item");
    oLi.onclick = [rectDel, modifyColor, addText][i];
    oLi.innerHTML = arr[i];
    node.appendChild(oLi);
  }
  return node;
}

// 自定义菜单-线段
function makeLineMenu() {
  var node = document.createElement("ol");
  node.classList.add("self-menu");
  let arr = ["修改颜色", "调整宽度", "添加文字", "添加动画", "删除"];
  for (let i in arr) {
    let oLi = document.createElement("li");
    oLi.classList.add("menu-item");
    // oLi.onclick = [rectDel][i]();
    oLi.innerHTML = arr[i];
    node.appendChild(oLi);
  }
  return node;
}

// 删除矩形
function rectDel(e) {
  const zr = getZR();
  // 删除矩形
  zr.remove(curRect);
  const rectModelList = getRectModelList();
  for (let i = rectModelList; i >= 0; i--) {
    if (rectModelList[i].id === curRect.id) {
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
    for (let j = lineModeList.length; j >= 0; j--) {
      if (lineModeList[i].id === relations[i].id) {
        lineModeList.splice(j, 1);
        break;
      }
    }
  }
  let body = document.getElementById("artBody");
  let node = document.getElementsByClassName("self-menu")[0];
  body.removeChild(node);
  e.stopPropagation();
}

// 修改颜色
function modifyColor() {
  //
}

// 添加动画
// function addAnimate() {
//   //
// }

// 添加文字
function addText() {
  //
}
