import { endResize } from "./resizeRect";
import { endDrawLine } from "./drawLine";
import { endRectMove } from "./rectMove";
import { endEdit } from "./editAttr";

// 清除所有编辑状态
export function clearHandler() {
  endResize();
  endDrawLine();
  endRectMove();
  endEdit();
}
