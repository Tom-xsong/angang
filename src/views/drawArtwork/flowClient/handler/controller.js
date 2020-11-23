import { endResize } from "./resizeRect";
import { endDrawLine } from "./drawLine";
import { endRectMove } from "./rectMove";
import { endEdit } from "./editAttr";

export function clearHandler() {
  endResize();
  endDrawLine();
  endRectMove();
  endEdit();
}
