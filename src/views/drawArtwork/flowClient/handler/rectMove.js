import { calcArrowCenter, lastItem, resetTransform } from "../helpers";
import { getId2element, getRectModelList } from "../render/render";
// import { getCurVertexes } from "./resizeRect";
import { clearHandler } from "./controller";

let isRunning = false;

// 开启移动状态
export function startRectMove() {
  clearHandler();
  isRunning = true;
  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    rectMove(id2element[rectModel.id]);
  });
}

// 结束移动状态
export function endRectMove() {
  if (!isRunning) return;
  isRunning = false;
  const rectModelList = getRectModelList();
  const id2element = getId2element();
  rectModelList.forEach(rectModel => {
    id2element[rectModel.id].offMove();
  });
}

function rectMove(rect) {
  let prevEvent;
  rect.draggable = true;
  function dragstart(e) {
    prevEvent = e;
  }

  function drag(e) {
    const offset = {
      x: e.offsetX - prevEvent.offsetX,
      y: e.offsetY - prevEvent.offsetY
    };
    prevEvent = e;
    rect.data.lineRelations.forEach(lineRelation => {
      lineFollowRect(lineRelation, offset);
    });
    // getCurVertexes().forEach(vertex => {
    //   vertexFollowRect(vertex, offset);
    // });
  }

  function dragend() {
    if (rect.data.type === "rect") {
      let shape = rect.shape;
      shape.x += rect.position[0];
      shape.y += rect.position[1];
      rect.setShape(shape);
    } else if (rect.data.type === "image") {
      let style = rect.style;
      style.x += rect.position[0];
      style.y += rect.position[1];
      rect.setStyle(style);
      rect.data.style.x = style.x;
      rect.data.style.y = style.y;
    } else {
      let shape = rect.shape;
      shape.cx += rect.position[0];
      shape.cy += rect.position[1];
      rect.setShape(shape);
    }
    resetTransform(rect);
  }
  rect.on("dragstart", dragstart);
  rect.on("drag", drag);
  rect.on("dragend", dragend);

  rect.offMove = () => {
    rect.draggable = false;
    rect.off("dragstart", dragstart);
    rect.off("drag", drag);
    rect.off("dragend", dragend);
  };
}

// 线跟随拖动
export function lineFollowRect(lineRelation, offset) {
  const id2element = getId2element();
  const line = id2element[lineRelation.id];
  const points = line.shape.points;

  lineVertexFollowRect(line, offset, lineRelation);

  if (points.length > 2) {
    lineVertexNextFollow(line, lineRelation);
  } else {
    lineAutoBreak(line);
  }

  line.setShape({
    points: line.shape.points
  });
  arrowFollowLine(line);
}

// 顶点跟随拖动
// function vertexFollowRect(circle, offset) {
//   const shape = circle.shape;
//   shape.cx += offset.x;
//   shape.cy += offset.y;
//   circle.setShape(shape);
// }

// 线顶点跟随拖动
function lineVertexFollowRect(line, offset, lineRelation) {
  if (lineRelation.isStart) {
    const first = line.shape.points[0];
    first[0] += offset.x;
    first[1] += offset.y;
  } else {
    const last = lastItem(line.shape.points);
    last[0] += offset.x;
    last[1] += offset.y;
  }
}

// 与端点相连的点跟随
function lineVertexNextFollow(line, lineRelation) {
  const points = line.shape.points;
  if (lineRelation.isStart) {
    const point = points[1];
    const first = points[0];
    if (line.isStartVertical) {
      point[0] = first[0];
    } else {
      point[1] = first[1];
    }
  } else {
    const point = points[points.length - 2];
    const last = points[points.length - 1];
    if (line.isEndVertical) {
      point[0] = last[0];
    } else {
      point[1] = last[1];
    }
  }
}

// 线自动转折
function lineAutoBreak(line) {
  const points = line.shape.points;

  if (line.isStartVertical || line.isEndVertical) {
    if (points[0][0] !== points[1][0]) {
      let halfY = ~~((points[1][1] - points[0][1]) / 2);
      points.splice(
        1,
        0,
        [points[0][0], points[0][1] + halfY],
        [points[1][0], points[0][1] + halfY]
      );
    }
  } else {
    if (points[0][1] !== points[1][1]) {
      let halfX = ~~((points[1][0] - points[0][0]) / 2);
      points.splice(
        1,
        0,
        [points[0][0] + halfX, points[0][1]],
        [points[0][0] + halfX, points[1][1]]
      );
    }
  }
}

// 箭头跟着线移动
function arrowFollowLine(line) {
  const arrow = line.arrow;
  const shape = arrow.shape;
  const [x, y] = calcArrowCenter(lastItem(line.shape.points), arrow.direction);
  shape.x = x;
  shape.y = y;
  arrow.setShape(shape);
  arrow.attr("origin", [shape.x, shape.y]);
}
