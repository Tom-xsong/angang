export function makeRectVertexes(rect) {
  const shape = rect.shape;
  const halfW = shape.width / 2;
  const halfH = shape.height / 2;
  return [
    [shape.x, shape.y],
    [shape.x + halfW, shape.y],
    [shape.x + shape.width, shape.y],
    [shape.x + shape.width, shape.y + halfH],
    [shape.x + shape.width, shape.y + shape.height],
    [shape.x + halfW, shape.y + shape.height],
    [shape.x, shape.y + shape.height],
    [shape.x, shape.y + halfH]
  ];
}

// 重置transform
export function resetTransform(element, offset = 0) {
  element.transform = [1, 0, 0, 1, offset, 0];
  element.invTransform = [1, -0, -0, 1, -offset, -0];
  element.decomposeTransform();
}

// 计算三角形的中点
export function calcArrowCenter([x, y], direction) {
  switch (direction) {
    case "T":
      y += 6;
      break;
    case "R":
      x -= 6;
      break;
    case "B":
      y -= 6;
      break;
    case "L":
      x += 6;
      break;
  }
  return [x, y];
}

export function lastItem(list, index = 1) {
  return list[list.length - index];
}
